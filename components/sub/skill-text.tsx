"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { useLang } from "@/components/providers/LanguageProvider";

const COPY = {
  pt: {
    badge: "Overview",
    title: "IA • Visão Computacional • Web",
    subtitle:
      "Engenheira de Computação com experiência em YOLO (detecção/segmentação), criação de datasets, treino/validação e APIs de inferência. Também atuo com Node.js/SQL e Next.js. Hobbies: robótica e game dev.",
  },
  en: {
    badge: "Overview",
    title: "AI • Computer Vision • Web",
    subtitle:
      "Computer Engineer with experience in YOLO (detection/segmentation), custom datasets, training/validation and inference APIs. I also work with Node.js/SQL and Next.js. Hobbies: robotics and game dev.",
  },
} as const;

export const SkillText = () => {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box flex items-center gap-2 py-[8px] px-[10px] border border-[#7042f88b] opacity-[0.9]"
      >
        <SparklesIcon className="text-[#b49bff] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">{t.badge}</h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        {t.title}
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center max-w-3xl"
      >
        {t.subtitle}
      </motion.div>
    </div>
  );
};
