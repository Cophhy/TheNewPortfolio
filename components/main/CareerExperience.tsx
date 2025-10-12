"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CAREER } from "@/constants/career";
import CareerRow from "@/components/sub/CareerRow";

export default function CareerExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // TRACK = container que começa LOGO APÓS o título.
  const trackRef = useRef<HTMLDivElement>(null);

  // --- Progresso da linha baseado APENAS no track (não pega o título)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.9", "end 0.9"],
  });
  // Estica o final para garantir que “encoste”
  const stretched = useTransform(scrollYProgress, [0, 0.985], [0, 1], { clamp: true });
  const progress = useSpring(stretched, { stiffness: 120, damping: 20, mass: 0.3 });

  // --- Posição Y (px) da ponta da linha dentro do TRACK
  const [lineY, setLineY] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const h = trackRef.current?.clientHeight ?? 0;
    setLineY(v * h);
  });

  // --- Medidas dos itens (centros) relativas ao topo do TRACK
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const [rowCenters, setRowCenters] = useState<number[]>([]);

  const measure = () => {
    if (!trackRef.current) return;
    const trackTop = trackRef.current.getBoundingClientRect().top + window.scrollY;
    const centers = rowRefs.current.map((el) => {
      if (!el) return Number.POSITIVE_INFINITY;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY - trackTop;
      return top + r.height / 2;
    });
    setRowCenters(centers);
  };

  useLayoutEffect(() => { measure(); }, []);
  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const t = setTimeout(measure, 50);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, []);

  // Revela quando a ponta da linha passou do centro do item (com pequeno padding)
  const revealPad = 40;
  const revealedFlags = rowCenters.map((c) => lineY + revealPad >= c);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 md:px-8 pt-24 md:pt-36 pb-48 md:pb-64 overflow-hidden"
    >
      {/* Título (fora do TRACK) */}
      <div className="mb-12 md:mb-16 text-center">
        <h2 className="text-zinc-100 text-4xl md:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent">
            My career &amp; experience
          </span>
        </h2>
      </div>

      {/* TRACK = tudo abaixo do título (linha começa exatamente aqui) */}
      <div ref={trackRef} className="relative">
        {/* Trilha (gradiente branco → violeta bem sutil) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/10 to-violet-400/10" />
        </div>

        {/* Linha de progresso (gradiente branco → violeta) + ponto */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
        >
          <motion.div style={{ scaleY: progress }} className="origin-top relative h-full w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-300 to-violet-500 shadow-[0_0_18px_2px_rgba(139,92,246,0.35)]" />
            {/* ponto no final (núcleo branco + glow violeta) */}
            <div className="pointer-events-none absolute left-1/2 bottom-[-10px] -translate-x-1/2">
              <div className="h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_14px_6px_rgba(255,255,255,0.55)]" />
              <div className="absolute inset-0 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-violet-400/35 blur-3xl" />
            </div>
          </motion.div>
        </div>

        {/* Linhas de carreira */}
        <div className="relative space-y-16 md:space-y-24 pb-8">
          {CAREER.map((item, idx) => (
            <div
              key={item.year + item.title}
              ref={(el) => { if (el) rowRefs.current[idx] = el; }}
            >
              <CareerRow item={item} index={idx} revealed={revealedFlags[idx]} />
            </div>
          ))}
          <div aria-hidden className="h-4 md:h-6" />
        </div>
      </div>
    </section>
  );
}
