"use client";
import dynamic from "next/dynamic";

const TechStackCanvas = dynamic(() => import("../three/TechStackCanvas"), { ssr: false });

export default function TechStack() {
  return (
    <section
      id="techstack"
      // mais altura + mais padding inferior para não encostar no footer
      className="relative w-screen overflow-hidden pb-10 md:pb-16"
    >
      {/* Título sobreposto */}
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-zinc-100 to-violet-300 bg-clip-text text-transparent">
            My Tech Stack
          </span>
        </h2>
      </div>

      {/* Canvas bem alto: evita recorte ao rotacionar/arrastar */}
      <div className="h-[115vh] md:h-[130vh] lg:h-[140vh]">
        <TechStackCanvas />
      </div>
    </section>
  );
}
