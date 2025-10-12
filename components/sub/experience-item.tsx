"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ExperienceItem } from "../../constants/experience";

type Props = { item: ExperienceItem; index: number };

export default function ExperienceItemCard({ item, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.06 }}
      className="group relative rounded-2xl border border-white/10 bg-white/5/0 bg-white/[0.02] p-5 md:p-6 backdrop-blur-sm
                 hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_60px_-20px_rgba(0,0,0,0.6)]
                 transition-transform duration-300 will-change-transform"
      whileHover={{ y: -4 }}
    >
      {/* filete de brilho sutil no hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.06), transparent 40%)" }} />

      <div className="flex items-start gap-4">
        {item.logoSrc ? (
          <Image
            src={item.logoSrc}
            alt={`${item.company} logo`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg border border-white/10 object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-xs text-zinc-400">
            {item.company.split(" ").slice(0, 2).map(s => s[0]).join("").toUpperCase()}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-zinc-100">
            {item.role}
          </h3>
          <p className="mt-0.5 text-sm text-zinc-400">
            {item.company} • {item.period}
            {item.location ? ` • ${item.location}` : ""}
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            {item.bullets.map((b, i) => (
              <li key={i} className="marker:text-zinc-500">{b}</li>
            ))}
          </ul>

          {item.tech?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <span key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
