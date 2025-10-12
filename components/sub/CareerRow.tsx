"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { CareerItem } from "@/constants/career";

type Props = { item: CareerItem; index: number; revealed?: boolean };

export default function CareerRow({ item, index, revealed = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const visible = revealed || hovered;

  const anim = {
    initial: { opacity: 0, y: 10, filter: "blur(6px)" },
    animate: {
      opacity: visible ? 1 : 0,
      y: visible ? 0 : 10,
      filter: visible ? "blur(0px)" : "blur(6px)",
    },
    transition: { duration: 0.45, ease: "easeOut", delay: index * 0.04 },
  } as const;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="grid grid-cols-12 items-start gap-x-6 md:gap-x-10"
    >
      {/* ESQUERDA: cargo + empresa (oculta até a linha passar/hover) */}
      <motion.div {...anim} className="col-span-6 md:col-span-5" aria-hidden={!visible}>
        <h3 className="text-zinc-100 text-xl md:text-2xl font-semibold leading-tight">
          {item.title}
        </h3>
        <p className="mt-1 text-violet-300/90 text-sm md:text-base">{item.company}</p>
      </motion.div>

      {/* CENTRO: ano SEMPRE visível (igual à referência) */}
      <div className="col-span-2 md:col-span-2 text-center">
        <p className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-200">
          {item.year}
        </p>
      </div>

      {/* DIREITA: descrição (oculta até a linha passar/hover) */}
      <motion.div
        {...anim}
        className="col-span-12 md:col-span-5 mt-4 md:mt-0"
        aria-hidden={!visible}
      >
        <p className="text-zinc-300/90 text-sm md:text-base leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
