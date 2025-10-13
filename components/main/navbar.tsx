"use client";

import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";

type LinkItem = { id: string; label: string };

const LINKS: Record<"pt" | "en", LinkItem[]> = {
  pt: [
    { id: "home",      label: "Início" },
    { id: "about",     label: "Sobre" },
    { id: "experience",label: "Carreira" },
    { id: "work",  label: "Projetos" },
    { id: "techstack", label: "Tech" },
    { id: "footer",      label: "Info" },
  ],
  en: [
    { id: "home",      label: "Home" },
    { id: "about",     label: "About" },
    { id: "experience",label: "Career" },
    { id: "work",  label: "Projects" },
    { id: "techstack", label: "Tech" },
    { id: "footer",      label: "Info" },
  ],
};

export function Navbar() {
  const { lang } = useLang();
  const links = useMemo(() => LINKS[lang], [lang]);
  const [active, setActive] = useState<string>(links[0]?.id ?? "home");

  useEffect(() => {
    const sections = links
      .map(l => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.2, 0.4, 0.6, 0.8] }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [links]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-[70] select-none" aria-label="Main">
      <div className="relative overflow-hidden rounded-full border border-white/10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-700/30 via-fuchsia-500/25 to-violet-700/30" />
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16),rgba(255,255,255,0)_58%)]" />
        </div>

        <ul className="relative z-[1] flex items-center gap-1 px-2.5 py-2 md:px-4 md:py-2.5">
          {links.map((link, i) => {
            const isFirst = i === 0;
            // 🔸 somente o primeiro NÃO recebe estado "ativo"
            const isActive = !isFirst && active === link.id;

            const classes = [
              "px-4 md:px-5 py-2 rounded-full text-sm md:text-base font-medium transition",
              "hover:bg-white/10 hover:text-white",
              isActive
                ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                : "text-zinc-200/90",
            ].join(" ");

            return (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={classes}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
