"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";
import { useLang } from "@/components/providers/LanguageProvider";

// 🔤 Cópias PT/EN
const COPY = {
  pt: {
    badge: "Portfólio de Engenheira de Computação",
    headingLine1: "Olá, eu sou",
    headingName: "Brendha",
    headingLine2: "Engenheira de Computação",
    description:
      "Sou engenheira de computação com experiência em inteligência artificial, machine learning e visão computacional — e um pé em desenvolvimento web. No meu tempo livre, exploro robótica e desenvolvimento de jogos. Veja meus projetos, stack e o que estou construindo agora.",
    cta: "Saiba mais",
  },
  en: {
    badge: "Computer Engineer Portfolio",
    headingLine1: "Hi, I'm",
    headingName: "Brendha",
    headingLine2: "Computer Engineer",
    description:
      "I'm a computer engineer with experience in artificial intelligence, machine learning, and computer vision — with a strong foot in web development. In my free time I tinker with robotics and game development. Check out my projects, stack, and what I’m building next.",
    cta: "Learn more",
  },
} as const;

type Lang = keyof typeof COPY;

export const HeroContent = ({
  lang,              
  showBadge = false,
}: { lang?: Lang; showBadge?: boolean }) => {
  const { lang: ctxLang } = useLang();                 
  const currentLang = (lang ?? ctxLang) as Lang;       
  const t = COPY[currentLang];

  return (
    <motion.div initial="hidden" animate="visible" className="flex flex-row items-center justify-center px-6 md:px-12 lg:px-20 mt-28 md:mt-36 w-full z-[20]">

      {/* Coluna esquerda: texto */}
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {showBadge && (
          <motion.div
            variants={slideInFromTop}
            className="Welcome-box flex items-center gap-2 py-[8px] px-[10px] rounded-lg border border-[#7042f88b] bg-white/5 backdrop-blur text-sm"
          >
            <SparklesIcon className="text-[#b49bff] h-5 w-5" />
            <span className="text-[13px] text-zinc-200">{t.badge}</span>
          </motion.div>
        )}

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-3 mt-6 text-white max-w-[680px] w-auto h-auto"
        >
          {/* Heading principal com destaque */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            {t.headingLine1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {t.headingName}
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-200">
              {t.headingLine2}
            </span>
          </h1>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base md:text-lg text-gray-300/90 leading-relaxed my-4 max-w-[680px]"
        >
          {t.description}
        </motion.p>

        <motion.a
          href="#about"
          variants={slideInFromLeft(1)}
          className="py-2.5 px-5 inline-flex items-center justify-center button-primary text-center text-white cursor-pointer rounded-lg max-w-[220px]"
          aria-label={t.cta}
        >
          {t.cta}
        </motion.a>
      </div>

      {/* Coluna direita: imagem */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full hidden md:flex justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="hero illustration"
          height={650}
          width={650}
          draggable={false}
          priority
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};
