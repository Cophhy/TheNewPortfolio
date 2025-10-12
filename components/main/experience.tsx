"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import ExperienceItemCard from "../sub/experience-item";
import { EXPERIENCE } from "../../constants/experience";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  // Barra de progresso da linha do tempo (efeito “mesmo feel” do projeto referência)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"], // quando entrar/quase sair da viewport
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  const letters = "Career & Experience".split("");

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 md:px-8 py-20 md:py-32">
      {/* Título com “stagger” leve (substitui letter-by-letter libs externas) */}
      <div className="mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight">
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02, duration: 0.4, ease: "easeOut" }}
              className="inline-block bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h2>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-zinc-400">
          Uma linha do tempo das suas experiências — com os mesmos “vibes” e animações,
          mas respeitando a paleta do seu portfólio.
        </p>
      </div>

      <div ref={ref} className="relative">
        {/* Linha base (sutil) */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/10 to-transparent" />

        {/* Barra de progresso animada */}
        <motion.div
          style={{ scaleY: progress }}
          className="origin-top absolute left-4 md:left-6 top-0 w-px bg-white/40"
        />

        <div className="pl-10 md:pl-14 space-y-6 md:space-y-8">
          {EXPERIENCE.map((item, idx) => (
            <div key={item.company + idx} className="relative">
              {/* nó da timeline */}
              <div className="absolute -left-6 md:-left-8 top-3 h-3 w-3 rounded-full border border-white/30 bg-white/70 shadow-[0_0_0_4px_rgba(255,255,255,0.06)]" />
              <ExperienceItemCard item={item} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
