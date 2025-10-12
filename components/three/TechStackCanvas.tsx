"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Environment,
  Html,
  OrbitControls,
  PresentationControls,
  Stars,
  Float,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { TECH_LOGOS } from "@/constants/techstack";

type V3 = [number, number, number];
const TAU = Math.PI * 2;
const ASTRONAUT_URL = "/models/astronaut.glb";
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

/* ---------- Astronauta com fallback ---------- */
function SafeAstronaut({ url = ASTRONAUT_URL, scale = 1.25 }: { url?: string; scale?: number }) {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(url).then(r => alive && setOk(r.ok)).catch(() => alive && setOk(false));
    return () => { alive = false; };
  }, [url]);
  if (ok === null) return null;
  if (!ok) {
    return (
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.3} roughness={0.35} />
      </mesh>
    );
  }
  const { scene } = useGLTF(url, true);
  return <primitive object={scene} scale={scale} castShadow receiveShadow rotation={[0, Math.PI, 0]} />;
}
useGLTF.preload(ASTRONAUT_URL);

/* ---------- Bola (logo) ---------- */
function TechBall({
  tex,
  radius = 0.9,
  ...events
}: { tex: string; radius?: number } & JSX.IntrinsicElements["mesh"]) {
  const map = useTexture(tex) as THREE.Texture;
  const rot: V3 = useMemo(
    () => [rnd(-Math.PI, Math.PI), rnd(-Math.PI, Math.PI), rnd(-Math.PI, Math.PI)],
    []
  );
  return (
    <Float speed={1.05} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh castShadow receiveShadow {...events}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.08}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={1.1}
        />
        <Decal position={[0, 0, radius]} rotation={rot} scale={radius * 0.9} map={map} />
      </mesh>
    </Float>
  );
}

/* ---------- Anel plano (Saturno) – menor/discreto ---------- */
function FlatRing({
  inner,
  outer,
  color = "#b3bbff",
  opacity = 0.26,
  tilt = 0.04,
}: {
  inner?: number; outer?: number; color?: string; opacity?: number; tilt?: number;
}) {
  return (
    <mesh rotation={[tilt, 0, 0]} renderOrder={-1}>
      <ringGeometry args={[inner ?? 1.2, outer ?? 1.8, 128]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        roughness={0.45}
        metalness={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ---------- Lua orbitando o planeta ---------- */
function Moon({
  distance = 1.9,
  radius = 0.28,
  speed = 0.9,
  color = "#dfe4ff",
}: {
  distance?: number; radius?: number; speed?: number; color?: string;
}) {
  const moonRef = useRef<THREE.Group>(null!);
  const t0 = useRef(Math.random() * TAU);
  useFrame((_, dt) => {
    if (!moonRef.current) return;
    t0.current += dt * speed;
    moonRef.current.position.set(Math.cos(t0.current) * distance, 0, Math.sin(t0.current) * distance);
  });
  return (
    <group ref={moonRef}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
      </mesh>
    </group>
  );
}

/* ---------- Planeta orbitando com decoração opcional ---------- */
type Decor =
  | { type: "none" }
  | { type: "saturn" }
  | { type: "moon"; distance?: number; radius?: number; speed?: number; color?: string }
  | { type: "saturn+moon"; moon?: { distance?: number; radius?: number; speed?: number; color?: string } };

function OrbitPlanet({
  texture,
  baseRadius,
  angle,
  speed,
  tilt = 0.12,
  ballRadius = 0.9,
  jump = 0.6,
  decor = { type: "none" },
}: {
  texture: string; baseRadius: number; angle: number; speed: number;
  tilt?: number; ballRadius?: number; jump?: number; decor?: Decor;
}) {
  const ringRef = useRef<THREE.Group>(null!);
  const armRef = useRef<THREE.Group>(null!);
  const r = useRef(baseRadius);
  const target = useRef(baseRadius);

  useFrame((_, dt) => {
    if (ringRef.current) ringRef.current.rotation.y += speed * dt;
    r.current = THREE.MathUtils.damp(r.current, target.current, 6, dt);
    if (armRef.current) armRef.current.position.set(r.current, 0, 0);
  });

  return (
    <group ref={ringRef} rotation={[tilt, 0, 0]}>
      <group rotation={[0, angle, 0]}>
        <group ref={armRef} position={[baseRadius, 0, 0]}>
          <TechBall
            tex={texture}
            radius={ballRadius}
            onPointerOver={(e) => { e.stopPropagation(); target.current = baseRadius + jump; document.body.style.cursor = "pointer"; }}
            onPointerOut={(e) => { e.stopPropagation(); target.current = baseRadius; document.body.style.cursor = ""; }}
          />

          {decor.type === "saturn" && (
            <FlatRing
              inner={ballRadius * 1.25}
              outer={ballRadius * 1.8}
            />
          )}

          {decor.type === "moon" && (
            <Moon
              distance={decor.distance ?? ballRadius * 2.2}
              radius={decor.radius ?? ballRadius * 0.32}
              speed={decor.speed ?? 0.95}
              color={decor.color ?? "#dde2ff"}
            />
          )}

          {decor.type === "saturn+moon" && (
            <>
              <FlatRing inner={ballRadius * 1.25} outer={ballRadius * 1.85} />
              <Moon
                distance={decor.moon?.distance ?? ballRadius * 2.25}
                radius={decor.moon?.radius ?? ballRadius * 0.32}
                speed={decor.moon?.speed ?? 0.95}
                color={decor.moon?.color ?? "#dfe4ff"}
              />
            </>
          )}
        </group>
      </group>
    </group>
  );
}

/* ---------- Cena ---------- */
export default function TechStackCanvas() {
  const textures = useMemo(() => TECH_LOGOS.map(l => l.src), []);

  // 6 planetas; SOMENTE o primeiro tem anel (Saturno)
  const THEMES: Decor[] = [
    { type: "saturn" }, // único com anel
    { type: "moon" },
    { type: "none" },
    { type: "moon", radius: 0.28, distance: 2.0, speed: 1.1 },
    { type: "none" },
    { type: "none" },
  ];

  // conjunto menor e câmera um pouco mais longe para caber bem
  const count = 6;
  const baseRadius = 4.6;     // 👈 menor (antes ~5.2)
  const speed = 0.32;
  const tilt = 0.14;
  const ballRadius = 0.9;     // 👈 planetas ligeiramente menores

  return (
    <Canvas
      className="!bg-transparent"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 0.6, 13], fov: 45 }}  // 👈 câmera um pouco mais distante
    >
      <Suspense fallback={<Html center className="text-zinc-300 text-sm">loading…</Html>}>
        <Stars radius={160} depth={50} count={1400} factor={4} saturation={0} fade speed={1} />

        <ambientLight intensity={0.65} />
        <directionalLight position={[6, 6, 8]} intensity={1.1} castShadow />
        <directionalLight position={[-5, -4, -3]} intensity={0.35} />
        <Environment preset="city" />

        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          snap
          config={{ mass: 1, tension: 220, friction: 30 }}
        >
          {/* scale 0.92 dá um respiro extra para não encostar no footer */}
          <group scale={0.92}>
            <SafeAstronaut />
            {Array.from({ length: count }).map((_, i) => (
              <OrbitPlanet
                key={i}
                texture={textures[i % textures.length]}
                baseRadius={baseRadius}
                angle={(i / count) * TAU}
                speed={speed}
                tilt={tilt}
                ballRadius={ballRadius}
                jump={0.65}
                decor={THEMES[i % THEMES.length]}
              />
            ))}
          </group>
        </PresentationControls>

        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.24} />
      </Suspense>
    </Canvas>
  );
}
