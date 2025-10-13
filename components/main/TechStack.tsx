"use client";

import dynamic from "next/dynamic";
import { useLang } from "@/components/providers/LanguageProvider";

const TechLogosOrbit = dynamic(() => import("../three/TechLogosOrbit"), { ssr: false });

const TITLE = {
  pt: "Minha Tech Stack",
  en: "My Tech Stack",
} as const;

export default function TechStack() {
  const { lang } = useLang();
  const t = TITLE[lang];

  return (
    <section
      id="techstack"
      className="relative w-screen overflow-hidden pb-10 md:pb-16"
      aria-label={t}
    >
      {/* Título central — abaixo da navbar, acima do canvas */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-2 md:top-3 z-[10]">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
          <span className="bg-gradient-to-r from-zinc-100 to-violet-300 bg-clip-text text-transparent">
            {t}
          </span>
        </h2>
      </div>

      {/* Canvas 3D — mais próximo do título */}
      <div className="relative z-[0] -mt-12 sm:-mt-14 md:-mt-16 lg:-mt-20 h-[115vh] md:h-[130vh] lg:h-[140vh]">
        <TechLogosOrbit />
      </div>
    </section>
  );
}
