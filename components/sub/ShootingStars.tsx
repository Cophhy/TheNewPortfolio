"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  // ajuste fino opcional
  starDensity?: number;   // densidade de estrelas de fundo
  meteorEveryMs?: [number, number]; // intervalo randômico de spawn
};

export default function ShootingStars({
  className = "",
  starDensity = 0.00018,
  meteorEveryMs = [1200, 2600],
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);
  const hidden = useRef(false);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ajuste de tamanho
    const fit = () => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement || document.body;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    // estrelas de fundo
    type Star = { x: number; y: number; r: number; a: number; t: number; s: number; hue: number };
    let stars: Star[] = [];

    const seedStars = () => {
      stars = [];
      const count = Math.max(60, Math.min(220, Math.floor(canvas.width * canvas.height * starDensity)));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 0.6 + Math.random() * 1.6,
          a: 0.4 + Math.random() * 0.6,
          t: Math.random() * Math.PI * 2,
          s: 0.002 + Math.random() * 0.006, // velocidade do twinkle
          hue: 250 + Math.random() * 20, // branco ~ lilás
        });
      }
    };

    // meteoro
    type Meteor = {
      x: number; y: number;
      vx: number; vy: number;
      len: number; life: number; ttl: number; w: number; hue: number;
    };
    let meteors: Meteor[] = [];
    let spawnTimer = 0;
    const range = (min: number, max: number) => min + Math.random() * (max - min);

    const spawnMeteor = () => {
      const fromTop = Math.random() < 0.65; // maioria vem de cima-direita
      const speed = range(0.6, 1.25) * dpr;
      const angle = fromTop ? range((Math.PI / 2) + 0.2, (Math.PI / 2) + 0.7) : range(2.8, 3.2);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const startX = fromTop ? range(canvas.width * 0.45, canvas.width * 0.95) : canvas.width - 5;
      const startY = fromTop ? range(-40, canvas.height * 0.15) : range(canvas.height * 0.2, canvas.height * 0.6);

      meteors.push({
        x: startX,
        y: startY,
        vx,
        vy,
        len: range(160, 260) * dpr,
        life: 0,
        ttl: range(900, 1400),
        w: range(1.2, 2.2) * dpr,
        hue: 250 + Math.random() * 25,
      });
    };

    const onVis = () => { hidden.current = document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const onResize = () => { dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); fit(); seedStars(); };
    window.addEventListener("resize", onResize);
    fit();
    seedStars();

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;

      if (!hidden.current && !prefersReduced) {
        // limpar
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // estrelas (twinkle)
        for (const s of stars) {
          s.t += s.s * dt;
          const alpha = s.a * (0.75 + 0.25 * Math.sin(s.t));
          ctx.fillStyle = `hsla(${s.hue}, 70%, 90%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }

        // spawn meteoro
        spawnTimer -= dt;
        if (spawnTimer <= 0) {
          spawnMeteor();
          const [mn, mx] = meteorEveryMs;
          spawnTimer = range(mn, mx);
        }

        // desenhar meteoro + rastro
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.life += dt;
          m.x += m.vx * dt;
          m.y += m.vy * dt;

          const tx = m.x - m.vx * m.len;
          const ty = m.y - m.vy * m.len;

          // tail
          const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
          grad.addColorStop(0, `hsla(${m.hue}, 100%, 85%, 0.95)`);
          grad.addColorStop(1, `hsla(${m.hue}, 100%, 85%, 0)`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = m.w;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();

          // head
          ctx.fillStyle = `hsla(${m.hue}, 100%, 95%, 0.9)`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.w * 0.75, 0, Math.PI * 2);
          ctx.fill();

          const off =
            m.x < -200 || m.y > canvas.height + 200 || m.life > m.ttl;
          if (off) meteors.splice(i, 1);
        }
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [meteorEveryMs, starDensity]);

  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 -z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
