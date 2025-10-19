"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";
import { useLang } from "@/components/providers/LanguageProvider";

const COPY = {
  pt: {
    title: "Sobre mim",
    headingLine1: "Olá, eu sou",
    name: "Brendha",
    role: "Engenheira de Computação",
    description:
      "Sou engenheira de computação com experiência em inteligência artificial, machine learning e visão computacional. Trabalho com a linha YOLO (detecção/segmentação), criação e curadoria de datasets, treino/validação e APIs de inferência que integram soluções de IA a aplicações e serviços. Também desenvolvo backend com Node.js/SQL e mantenho um pé forte no desenvolvimento web. Paralelamente, estudo LLMs para expandir meu repertório — RAG, embeddings, avaliação e boas práticas de productização.",
    pills: ["YOLO", "Computer Vision", "Node.js", "SQL", "React", "Next.js", "LLMs (aprendizado)"],
  },
  en: {
    title: "About",
    headingLine1: "Hi, I'm",
    name: "Brendha",
    role: "Computer Engineer",
    description:
      "I'm a computer engineer with experience in artificial intelligence, machine learning, and computer vision. I work with the YOLO family (detection/segmentation), dataset creation/curation, training/validation, and inference APIs that bring AI into applications and services. I also build backend with Node.js/SQL and keep a strong foot in web development. In parallel, I'm learning LLMs to broaden my toolkit — RAG, embeddings, evaluation, and productization best practices.",
    pills: ["YOLO", "Computer Vision", "Node.js", "SQL", "React", "Next.js", "LLMs (learning)"],
  },
} as const;

export default function About() {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24"
    >
      {/* título */}
      <div className="mb-10 md:mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-zinc-100 to-violet-300 bg-clip-text text-transparent">
            {t.title}
          </span>
        </h2>
      </div>

      {/* grid com svg + texto (sem card) */}
      <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
        {/* Ilustração */}
        <motion.div
          variants={slideInFromLeft(0.2)}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <Image
            src="/hero-bg.svg"
            alt="About illustration"
            width={620}
            height={620}
            priority
            className="select-none pointer-events-none max-w-full h-auto"
          />
        </motion.div>

        {/* Texto direto, sem retângulo */}
        <motion.div
          data-resume
          variants={slideInFromRight(0.3)}
          initial="hidden"
          animate="visible"
          className="p-0"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 leading-tight">
            {t.headingLine1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {t.name}
            </span>
            <br />
            <span className="text-xl md:text-2xl font-semibold text-zinc-300">
              {t.role}
            </span>
          </h3>

          <p className="mt-4 text-zinc-300/90 text-base md:text-lg leading-relaxed">
            {t.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {t.pills.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-zinc-200"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
