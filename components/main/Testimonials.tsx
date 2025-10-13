"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TESTIMONIALS } from "@/constants/testimonials";
import { motion, AnimatePresence } from "framer-motion";

const AUTO_MS = 6000;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  const items = useMemo(() => TESTIMONIALS, []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // timer cross-platform (browser/Node) e sem duplicar no Strict Mode
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      return;
    }
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTO_MS);
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [paused, items.length]);

  // teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  // swipe (mobile)
  const startX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 50) {
      setIndex((i) => (dx < 0 ? (i + 1) % items.length : (i - 1 + items.length) % items.length));
    }
  };

  const goto = (i: number) => setIndex(i);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  const t = items[index];

  return (
    <section
      id="testimonials"
      className="relative mx-auto max-w-7xl px-6 md:px-8 pt-12 md:pt-16 pb-64 md:pb-80"
      aria-label="Testimonials"
    >
    {/* === FUNDO: vídeo full-bleed com fade nas bordas === */}
    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full -z-10">
      {/* wrapper com mask (centro opaco, bordas transparentes) */}
      <div
        className="
          relative h-full w-full
          [mask-image:radial-gradient(ellipse_at_center,white_62%,transparent_100%)]
          [-webkit-mask-image:radial-gradient(ellipse_at_center,white_62%,transparent_100%)]
        "
      >
        <video
          className="h-full w-full object-cover opacity-30"
          preload="none"
          playsInline
          muted
          loop
          autoPlay
          aria-hidden="true"
        >
          <source src="/videos/skills-bg.webm" type="video/webm" />
          {/* <source src="/videos/skills-bg.mp4" type="video/mp4" /> */}
        </video>
      </div>

      {/* overlay sutil p/ legibilidade do texto (opcional) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/50 via-transparent to-[#030014]/75" />
    </div>



      {/* título no estilo do site */}
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-zinc-100 to-violet-300 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h2>
      </div>

      {/* carrossel */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* seta esquerda */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur px-2.5 py-2 shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        {/* seta direita */}
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur px-2.5 py-2 shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        {/* pista */}
        <div className="overflow-hidden">
          <div className="grid place-items-center">
            <AnimatePresence mode="wait">
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } }}
                exit={{ opacity: 0, y: -18, scale: 0.98, transition: { duration: 0.35, ease: EASE } }}
                className="
                  w-full max-w-4xl md:max-w-5xl
                  rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur
                  shadow-[0_10px_50px_-18px_rgba(0,0,0,0.6)]
                  p-8 md:p-10
                "
              >
                {/* conteúdo centralizado vertical e horizontalmente */}
                <div className="min-h-[260px] md:min-h-[300px] flex flex-col items-center justify-center text-center gap-5 md:gap-6">
                  {/* avatar central */}
                  <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border border-white/10 grid place-items-center bg-white/5">
                    {t.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xl md:text-2xl font-bold text-zinc-200">
                        {t.name.split(" ").map((s) => s[0]).slice(0, 2)}
                      </span>
                    )}
                  </div>

                  {/* texto */}
                  <blockquote className="max-w-3xl text-zinc-300 text-base md:text-lg leading-relaxed">
                    “{t.text}”
                  </blockquote>

                  {/* autor */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold text-zinc-100">{t.name}</span>
                    <span className="text-zinc-400 text-sm md:text-base">
                      {t.role}
                      {t.company ? ` • ${t.company}` : ""}
                    </span>
                    {t.link && (
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-violet-300/90 hover:text-violet-200 underline decoration-transparent hover:decoration-violet-300/40 transition text-sm md:text-[15px]"
                      >
                        ver perfil
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* indicadores */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => goto(i)}
              aria-label={`Ir para depoimento ${i + 1}`}
              className={[
                "h-2.5 rounded-full transition-all",
                i === index ? "w-6 bg-violet-300/80" : "w-2.5 bg-white/20 hover:bg-white/30",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
