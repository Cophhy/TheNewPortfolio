"use client";

import { useLang } from "@/components/providers/LanguageProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const toggle = () => setLang(lang === "pt" ? "en" : "pt");

  return (
    <button
      onClick={toggle}
      aria-label="Change language"
      className="
        fixed top-4 right-4 z-50
        rounded-full border border-white/10 bg-white/10 hover:bg-white/15
        backdrop-blur px-3 py-1.5 text-sm text-zinc-100
        shadow-[0_8px_25px_-10px_rgba(0,0,0,0.6)]
        transition
      "
    >
      {lang.toUpperCase()}
    </button>
  );
}
