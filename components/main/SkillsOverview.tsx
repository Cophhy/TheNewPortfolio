"use client";

import { useLang } from "@/components/providers/LanguageProvider";

const COPY = {
  pt: {
    title: "Overview",
    lead:
      "Engenheira de Computação com experiência em IA, machine learning e visão computacional (YOLO). Trabalho com criação de datasets, treino/validação e APIs de inferência. Também desenvolvo backend em Node.js (SQL) e tenho um pé forte em desenvolvimento web. Hobbies: robótica e game dev.",
    blocks: {
      atuacaoTitle: "Áreas de atuação",
      atuacao: [
        "IA aplicada • YOLO (detecção/segmentação) • pipelines de CV",
        "Criação e curadoria de datasets • avaliação e métricas",
        "APIs de inferência e manutenção de serviços",
        "Backend: Node.js • SQL",
        "Front-end: React/Next.js • UX e microinterações",
      ],
      focoTitle: "No que estou buscando",
      foco: [
        "Projetos de Visão Computacional em produção",
        "P&D com espaço para experimentar e medir impacto",
        "Times multidisciplinares e foco em produto",
      ],
    },
    pills: ["YOLO", "Computer Vision", "Node.js", "SQL", "React", "Next.js", "Robótica", "Game Dev"],
    cta: "Fale comigo",
  },
  en: {
    title: "Overview",
    lead:
      "Computer Engineer with experience in AI, machine learning and computer vision (YOLO). I build custom datasets, train/validate models and ship inference APIs. I also develop backend with Node.js (SQL) and keep a strong foot in web development. Hobbies: robotics and game dev.",
    blocks: {
      atuacaoTitle: "What I do",
      atuacao: [
        "Applied AI • YOLO (detection/segmentation) • CV pipelines",
        "Dataset creation/curation • evaluation & metrics",
        "Inference APIs and service maintenance",
        "Backend: Node.js • SQL",
        "Front-end: React/Next.js • UX & microinteractions",
      ],
      focoTitle: "What I’m looking for",
      foco: [
        "Production Computer Vision projects",
        "R&D with room to experiment and measure impact",
        "Cross-functional teams and product focus",
      ],
    },
    pills: ["YOLO", "Computer Vision", "Node.js", "SQL", "React", "Next.js", "Robotics", "Game Dev"],
    cta: "Contact me",
  },
} as const;

export default function SkillsOverview() {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-start">
      {/* Texto principal */}
      <article
        data-resume
        className="
          rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur
          p-6 md:p-8 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]
        "
      >
        <header className="mb-4 md:mb-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-zinc-100 to-violet-300 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
        </header>

        <p className="text-zinc-300/90 text-base md:text-lg leading-relaxed">
          {t.lead}
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
      </article>

      {/* Listas */}
      <div className="grid gap-6">
        <section
          data-resume
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 md:p-7"
        >
          <h3 className="text-zinc-100 text-xl md:text-2xl font-semibold">
            {t.blocks.atuacaoTitle}
          </h3>
          <ul className="mt-3 space-y-2.5 text-zinc-300/90 text-sm md:text-base">
            {t.blocks.atuacao.map((li, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-violet-300/90" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          data-resume
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 md:p-7"
        >
          <h3 className="text-zinc-100 text-xl md:text-2xl font-semibold">
            {t.blocks.focoTitle}
          </h3>
          <ul className="mt-3 space-y-2.5 text-zinc-300/90 text-sm md:text-base">
            {t.blocks.foco.map((li, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-violet-300/90" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] transition px-4 py-2 text-sm md:text-base text-zinc-100"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
