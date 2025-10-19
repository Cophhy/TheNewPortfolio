"use client";

import { motion } from "framer-motion";
import { slideInFromLeft } from "@/lib/motion";
import { useLang } from "@/components/providers/LanguageProvider";
import { useMemo } from "react";

const COPY = {
  pt: { sentence: "Oi, eu sou a Brendha  Engenheira de computação focada em IA." },
  en: { sentence: "Hi, I'm Brendha  Computer engineer focused on AI." },
} as const;

export const HeroContent = () => {
  const { lang } = useLang();
  const t = COPY[lang];

  const parts = useMemo(() => {
    const s = t.sentence.trim();

    // 1) Se houver travessão —, divide nele
    if (s.includes("—")) return s.split("—").map((p) => p.trim());

    // 2) Se houver "duplo espaço", divide no primeiro
    const dbl = s.split(/\s{2,}/);
    if (dbl.length >= 2) return [dbl[0].trim(), dbl.slice(1).join(" ").trim()];

    // 3) Heurística: antes de "Engenheira"/"Computer"
    const m = s.match(/^(.*?)(\s+)(Engenheira|Computer)/i);
    if (m) return [m[1].trim(), s.slice(m[1].length).trim()];

    // fallback: tudo em uma linha
    return [s];
  }, [t.sentence]);

  return (
    <section id="home" className="relative w-full">
      <div className="relative z-[20] min-h-[100svh] px-6 md:px-12 lg:px-20">
        <div className="absolute inset-x-0 top-[58%] md:top-[60%] -translate-y-1/2 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={slideInFromLeft(0.3)}
            className="text-white font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl mx-auto max-w-[1000px]"
          >
            {parts.length >= 2 ? (
              <>
                <span>{parts[0]}</span>
                <br />
                <span>{parts[1]}</span>
              </>
            ) : (
              parts[0]
            )}
          </motion.h1>
        </div>
      </div>
    </section>
  );
};
