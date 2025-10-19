"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { WorkItem } from "@/constants/work";

type Props = { item: WorkItem; imageFirst?: boolean };

export default function WorkSlide({ item }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="h-full w-full px-3 sm:px-4 md:px-5 pt-2 md:pt-3 flex items-start">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="
            w-full
            h-[74%] md:h-[76%] lg:h-[78%]
            min-h-[480px] md:min-h-[560px] lg:min-h-[620px]
            rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm
            shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]
            px-4 py-4 md:px-5 md:py-5
            flex flex-col gap-4 md:gap-5
          "
        >
          {/* Cabeçalho */}
          <div className="flex items-start justify-between gap-3">
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
              {item.number}
            </div>
            <div className="text-right">
              <h3 className="text-zinc-100 text-lg md:text-xl font-semibold leading-tight truncate">
                {item.title || "—"}
              </h3>
              <p className="mt-0.5 text-zinc-400 text-sm md:text-base truncate">
                {item.subtitle || ""}
              </p>
            </div>
          </div>

          {/* Descrição */}
          {item.description ? (
            <div>
              <p className="mt-1 text-zinc-300/90 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          ) : null}

          {/* Tools & Stack (fontes reduzidas) */}
          {item.tools ? (
            <div>
              <p className="text-zinc-300 font-medium text-xs md:text-[12px] uppercase tracking-wide">
                Tools & stack
              </p>
              <p className="mt-1 text-zinc-400 text-[11px] md:text-sm leading-snug">
                {item.tools}
              </p>
            </div>
          ) : null}

          {/* Imagem / Vídeo — altura um pouco menor */}
          <div
            className="
              relative w-full
              h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px]
              max-h-[54vh]
              rounded-lg overflow-hidden border border-white/10
            "
          >
            {item.imageSrc ? (
              <Image
                src={item.imageSrc}
                alt={item.title || "Project image"}
                fill
                sizes="33vw"
                className="object-contain"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-zinc-500">
                <span className="text-sm">Preview</span>
              </div>
            )}
          </div>

          {/* Link */}
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="mt-2 self-start rounded-md border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs md:text-sm text-zinc-200 hover:bg-white/[0.08] hover:border-white/20 transition"
            >
              View project →
            </a>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
