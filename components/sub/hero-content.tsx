"use client";

import { motion } from "framer-motion";
import { slideInFromLeft } from "@/lib/motion";
import { useLang } from "@/components/providers/LanguageProvider";

const COPY = {
  pt: {
    sentence:
      "Oi, eu sou a Brendha — engenheira de computação focada em IA, visão computacional e web.",
  },
  en: {
    sentence:
      "Hi, I'm Brendha — a computer engineer focused on AI, computer vision, and the web.",
  },
} as const;

export const HeroContent = () => {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <section id="home" className="relative w-full">
      {/* container do hero: mantém altura de tela, não mexe no BG */}
      <div
        className="
          relative z-[20]
          min-h-[100svh]              /* ocupa a viewport inteira */
          px-6 md:px-12 lg:px-20
        "
      >
        {/* wrapper ABSOLUTO que controla a posição vertical do texto */}
        <div
          className="
            absolute inset-x-0
            top-[58%] md:top-[60%]    /* ↓ desce o texto (ajuste estes números) */
            -translate-y-1/2
            text-center
          "
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={slideInFromLeft(0.3)}
            className="text-white font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl mx-auto max-w-[1000px]"
          >
            {t.sentence}
          </motion.h1>
        </div>
      </div>
    </section>
  );
};
