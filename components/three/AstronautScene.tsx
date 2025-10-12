"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  PresentationControls,
  OrbitControls,
  Stars,
  useGLTF,
  Html,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";

type V3 = [number, number, number];

function AstronautModel({
  url = "/models/astronaut.glb",
  scale = 1.2,
}: { url?: string; scale?: number }) {
  const { scene } = useGLTF(url, true);

  // fallback simples se o arquivo não existir
  if (!scene) {
    return (
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.2} roughness={0.3} />
      </mesh>
    );
  }

  return (
    <primitive
      object={scene}
      scale={scale}
      castShadow
      receiveShadow
      rotation={[0, Math.PI, 0]}
    />
  );
}
useGLTF.preload("/models/astronaut.glb");

// --- fitas orbitando (efeito “espiral” ao redor do astronauta)
function Helix({
  radius = 2.4,
  height = 2.6,
  turns = 3,
  thickness = 0.06,
  color = "#7c8be4",
  offset = 0,
}: {
  radius?: number;
  height?: number;
  turns?: number;
  thickness?: number;
  color?: string;
  offset?: number; // desloca o início da espiral
}) {
  // gera pontos de uma hélice
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segs = 300;
    for (let i = 0; i <= segs; i++) {
      const t = (i / segs) * Math.PI * 2 * turns + offset;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const y = (i / segs) * height - height / 2;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, [radius, height, turns, offset]);

  return (
    <mesh castShadow>
      <tubeGeometry args={[curve, 400, thickness, 16, false]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.25} />
    </mesh>
  );
}

function Swirls() {
  const g = useRef<THREE.Group>(null!);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.25;
  });

  return (
    <group ref={g}>
      {/* 5 fitas com offsets diferentes (parecido com o visual do planeta do repositório) */}
      <Helix radius={2.6} height={2.0} turns={2.6} thickness={0.065} color="#8b5cf6" offset={0} />
      <Helix radius={2.55} height={2.0} turns={2.6} thickness={0.055} color="#9e8cf6" offset={0.6} />
      <Helix radius={2.5} height={2.0} turns={2.6} thickness={0.05} color="#a79bf9" offset={1.2} />
      <Helix radius={2.45} height={2.0} turns={2.6} thickness={0.05} color="#b7a7ff" offset={1.8} />
      <Helix radius={2.4} height={2.0} turns={2.6} thickness={0.045} color="#c9bbff" offset={2.4} />
    </group>
  );
}

export default function AstronautScene() {
  return (
    <Canvas
      className="!bg-transparent"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 0.2, 7.5], fov: 45, near: 0.1, far: 100 }}
    >
      <Suspense fallback={<Html center className="text-zinc-300 text-sm">loading…</Html>}>
        {/* fundo de estrelas discreto (como no repo de referência) */}
        <Stars radius={120} depth={40} count={1200} factor={4} saturation={0} fade speed={1} />

        {/* luzes */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 7]} intensity={1.1} castShadow />
        <directionalLight position={[-6, -3, -2]} intensity={0.3} />
        <Environment preset="city" />

        {/* controles de apresentação: arrasta com o mouse, limites suaves */}
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          snap
          config={{ mass: 1, tension: 220, friction: 30 }}
        >
          <group position={[0, 0, 0]}>
            <AstronautModel />
            <Swirls />
          </group>
        </PresentationControls>

        {/* rotação automática suave quando não estiver arrastando */}
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Suspense>
    </Canvas>
  );
}
