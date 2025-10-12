"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "pt" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "pt", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  // pega preferência salva ou idioma do navegador
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "pt" || saved === "en") {
      setLang(saved);
    } else {
      const nav = typeof navigator !== "undefined" ? navigator.language : "pt";
      setLang(nav.toLowerCase().startsWith("pt") ? "pt" : "en");
    }
  }, []);

  // persiste e atualiza <html lang="">
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
