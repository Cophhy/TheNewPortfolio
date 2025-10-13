"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";

type PlanetCfg = {
  id: string;
  name: string;
  color: string;
  r: number;          // raio da órbita
  speed: number;      // velocidade angular
  size: number;       // raio do planeta
  phase?: number;     // deslocamento angular inicial
  ring?: boolean;     // mostra anel (opcional)
};

function Planet({ cfg }: { cfg: PlanetCfg }) {
  const group = useRef<THREE.Group>(null!);
  const pop = useRef(0); // deslocamento radial extra (hover)
  const [hover, setHover] = useState(false);
  const angle = useRef(cfg.phase ?? 0);

  useFrame((_, dt) => {
    angle.current += cfg.speed * dt;
    // LERP do "pop" ao passar mouse (0 -> 1)
    const target = hover ? 1 : 0;
    pop.current += (target - pop.current) * Math.min(1, dt * 6);

    const rr = cfg.r + pop.current * 0.55; // empurra ~0.55 ao passar mouse
    const x = Math.cos(angle.current) * rr;
    const z = Math.sin(angle.current) * rr;
    // leve inclinação do plano orbital
    const y = Math.sin(angle.current * 0.7) * 0.08;

    group.current.position.set(x, y, z);
    group.current.rotation.y += dt * 0.4;
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={() => setHover(false)}
    >
      {/* Planeta */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[cfg.size, 48, 48]} />
        <meshStandardMaterial color={cfg.color} roughness={0.35} metalness={0.25} />
      </mesh>

      {/* Anel opcional (bem discreto) */}
      {cfg.ring && (
        <mesh rotation={[0.6, 0, 0]} renderOrder={-1}>
          <ringGeometry args={[cfg.size * 1.35, cfg.size * 1.95, 64]} />
          <meshStandardMaterial
            color={cfg.color}
            transparent
            opacity={0.22}
            roughness={0.4}
            metalness={0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Rótulo */}
      <Html
        distanceFactor={8}
        position={[0, cfg.size + 0.28, 0]}
        className="pointer-events-none"
        center
      >
        <span
          className="rounded-full border border-white/10 bg-white/10 backdrop-blur
                     px-2.5 py-1 text-xs text-zinc-100 whitespace-nowrap"
          style={{ boxShadow: "0 6px 24px -10px rgba(0,0,0,0.6)" }}
        >
          {cfg.name}
        </span>
      </Html>
    </group>
  );
}

function Scene() {
  // configuração dos 5 planetas
  const planets = useMemo<PlanetCfg[]>(
    () => [
      { id: "python", name: "Python", color: "#3776AB", r: 2.6, speed: 0.75, size: 0.55, phase: 0.2 },
      { id: "csharp", name: "C#", color: "#9B4F97", r: 3.3, speed: 0.6, size: 0.6, phase: 1.1 },
      { id: "cpp", name: "C++", color: "#00599C", r: 2.1, speed: 0.95, size: 0.5, phase: 2.3 },
      { id: "java", name: "Java", color: "#EA2D2E", r: 3.9, speed: 0.55, size: 0.58, phase: 3.4, ring: true },
      { id: "js", name: "JavaScript", color: "#F7DF1E", r: 1.7, speed: 1.1, size: 0.52, phase: 4.6 },
    ],
    []
  );

  return (
    <>
      {/* Luzes simples */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 6, 8]} intensity={1.2} />
      <directionalLight position={[-4, -3, -2]} intensity={0.35} />

      {/* Núcleo sutil no centro (não é astronauta; só glow) */}
      <group>
        <mesh>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Planetas */}
      {planets.map((p) => (
        <Planet key={p.id} cfg={p} />
      ))}
    </>
  );
}

export default function TechPlanets() {
  return (
    <Canvas
      className="!bg-transparent"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0.7, 8], fov: 45 }}
    >
      <Scene />
    </Canvas>
  );
}
