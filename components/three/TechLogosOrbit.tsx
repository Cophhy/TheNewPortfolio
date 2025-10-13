"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";

type LogoCfg = {
  id: string;
  name: string;
  model: string;    // /public/models/*.glb
  phase: number;    // fase inicial p/ espaçar no mesmo círculo
  yaw?: number;     // correção da “frente” após billboard (rad)
  backface?: boolean; // true => mostra as costas (vira 180°)
};

const UNIT_SIZE = 1; // normalização de tamanho (maior dimensão = 1)

// === util: clona, centraliza no (0,0,0) e normaliza ===
function useNormalizedModel(path: string) {
  const gltf = useGLTF(path);
  const scene = useMemo(() => {
    const s = gltf.scene.clone(true);
    s.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (o.material?.map) o.material.map.encoding = THREE.sRGBEncoding;
      }
    });
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = UNIT_SIZE / maxDim;
    s.scale.setScalar(scale);
    const box2 = new THREE.Box3().setFromObject(s);
    const center = box2.getCenter(new THREE.Vector3());
    s.position.sub(center);
    return s;
  }, [gltf]);
  return scene;
}

// === Astronauta central (flutuação leve) ===
function Astronaut() {
  const model = useNormalizedModel("/models/astronaut.glb");
  const ref = useRef<THREE.Group>(null!);

  useFrame((state, dt) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 1.15) * 0.2;
    ref.current.rotation.y += dt * 0.35;
  });

  return (
    <group ref={ref} scale={1.25}>
      <primitive object={model} />
    </group>
  );
}

// === Logo em órbita, sempre “billboard” (ou “backboard”) pra câmera ===
const Y_AXIS = new THREE.Vector3(0, 1, 0);

function OrbitLogo({
  cfg,
  radius,
  angularSpeed,
}: {
  cfg: LogoCfg;
  radius: number;
  angularSpeed: number;
}) {
  const orbit = useRef<THREE.Group>(null!);  // posição na órbita
  const face = useRef<THREE.Group>(null!);   // orientação do modelo
  const model = useNormalizedModel(cfg.model);

  const [hover, setHover] = useState(false);
  const angle = useRef(cfg.phase);
  const pop = useRef(0);

  // yaw base (alinha “frente” do modelo) + 180° se quiser as costas
  const yawAngle = (cfg.yaw ?? Math.PI) + (cfg.backface ? Math.PI : 0);
  const yawQ = useMemo(
    () => new THREE.Quaternion().setFromAxisAngle(Y_AXIS, yawAngle),
    [yawAngle]
  );

  useFrame((state, dt) => {
    angle.current += angularSpeed * dt;

    // POP no hover (empurra radialmente sem mexer layout)
    const target = hover ? 1 : 0;
    pop.current += (target - pop.current) * Math.min(1, dt * 6);

    const rr = radius + pop.current * 0.55;
    const x = Math.cos(angle.current) * rr;
    const z = Math.sin(angle.current) * rr;

    // mesma ÓRBITA plana (um círculo): y = 0
    orbit.current.position.set(x, 0, z);

    // BILLBOARD: copia orientação da câmera e aplica yaw fixo
    face.current.quaternion.copy(state.camera.quaternion).multiply(yawQ);
  });

  return (
    <group
      ref={orbit}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={() => setHover(false)}
    >
      <group ref={face} scale={1.0}>
        <primitive object={model} />
      </group>
    </group>
  );
}

function Scene() {
  // === CONFIG ÚNICA de órbita (todas no MESMO círculo e MESMA velocidade) ===
  const RADIUS = 2.6;
  const SPEED = 0.85;

  // 5 itens igualmente espaçados: fases 0, 2π/5, 4π/5, 6π/5, 8π/5
  const PHASES = [0, (2 * Math.PI) / 5, (4 * Math.PI) / 5, (6 * Math.PI) / 5, (8 * Math.PI) / 5];

  const items = useMemo<LogoCfg[]>(
    () => [
      // yaw padrão Math.PI costuma alinhar a “frente” de muitos modelos GLB.
      { id: "python", name: "Python", model: "/models/python.glb",     phase: PHASES[0], yaw: Math.PI },
      // C++ (se o seu arquivo for cpp.glb, troque o caminho)
      { id: "cpp",    name: "C++",    model: "/models/c.glb",          phase: PHASES[1], yaw: Math.PI, backface: true },
      { id: "csharp", name: "C#",     model: "/models/c_sharp.glb",    phase: PHASES[2], yaw: Math.PI, backface: true },
      { id: "java",   name: "Java",   model: "/models/java.glb",       phase: PHASES[3], yaw: Math.PI },
      { id: "react",  name: "React",  model: "/models/react_logo.glb", phase: PHASES[4], yaw: Math.PI },
    ],
    []
  );

  return (
    <>
      {/* Luz reforçada pro astronauta não escurecer */}
      <hemisphereLight color={"#ffffff"} groundColor={"#0b0b0b"} intensity={1.1} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 7, 9]} intensity={1.4} />
      <directionalLight position={[-5, -3, -4]} intensity={0.45} />

      {/* Centro */}
      <Astronaut />

      {/* Logos na MESMA órbita e MESMA velocidade */}
      {items.map((cfg) => (
        <OrbitLogo key={cfg.id} cfg={cfg} radius={RADIUS} angularSpeed={SPEED} />
      ))}

      {/* Girar com o mouse (zoom/pan desligados) */}
      <OrbitControls makeDefault enablePan={false} enableZoom={false} rotateSpeed={0.85} />
    </>
  );
}

export default function TechStackCanvas() {
  return (
    <Canvas
      className="!bg-transparent h-full w-full"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0.9, 8.2], fov: 45 }}
      shadows={false}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

// Preloads
useGLTF.preload("/models/astronaut.glb");
useGLTF.preload("/models/python.glb");
useGLTF.preload("/models/c.glb");          // troque para /models/cpp.glb se for C++
useGLTF.preload("/models/c_sharp.glb");
useGLTF.preload("/models/java.glb");
useGLTF.preload("/models/react_logo.glb");
