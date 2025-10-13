"use client";

import { useCallback, useMemo, useState } from "react";
import { useLang } from "@/components/providers/LanguageProvider";
import { getCareer } from "@/constants/career";

const CONTACT = {
  phone: "+55 (47) 98906-8550",
  email: "brendhaiara@hotmail.com",
  address_pt: "São Bento do Sul, Santa Catarina - Brasil",
  address_en: "São Bento do Sul, Santa Catarina - Brazil",
  github: "https://github.com/Cophhy",
  linkedin: "https://www.linkedin.com/in/", // ajuste se tiver URL exata
};

const COPY = {
  pt: {
    btn: "Baixar PDF",
    name: "Brendha",
    role: "Engenheira de Computação",
    heroFallback:
      "Oi, eu sou a Brendha — engenheira de computação focada em IA, visão computacional e web.",
    sections: {
      summary: "Resumo",
      about: "Sobre",
      career: "Carreira",
      contact: "Contato",
    },
    labels: {
      phone: "Telefone",
      email: "Email",
      address: "Endereço",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    file: "Brendha-Resume.pdf",
  },
  en: {
    btn: "Download PDF",
    name: "Brendha",
    role: "Computer Engineer",
    heroFallback:
      "Hi, I'm Brendha — a computer engineer focused on AI, computer vision, and the web.",
    sections: {
      summary: "Summary",
      about: "About",
      career: "Career",
      contact: "Contact",
    },
    labels: {
      phone: "Phone",
      email: "Email",
      address: "Address",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    file: "Brendha-Resume.pdf",
  },
} as const;

export default function ResumeButton() {
  const { lang } = useLang();
  const t = COPY[lang];

  const [loading, setLoading] = useState(false);

  // coleta blocos com data-resume (ex.: About) do DOM
  const collectResumeBlocks = useCallback(() => {
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-resume]")
    ).map((el) => el.innerText.trim());
    return blocks.filter(Boolean);
  }, []);

  // tenta pegar a frase do hero; se não achar, usa fallback do idioma
  const heroSentence = useMemo(() => {
    const heroH1 =
      (document.querySelector("#home h1") as HTMLElement | null)?.innerText?.trim();
    return heroH1 && heroH1.length > 3 ? heroH1 : t.heroFallback;
  }, [t.heroFallback]);

  const makeHtml = useCallback(() => {
    const career = getCareer(lang); // sua fonte da linha do tempo (PT/EN)
    const aboutBlocks = collectResumeBlocks();

    const contactAddress = lang === "pt" ? CONTACT.address_pt : CONTACT.address_en;

    // CSS simples e estável para A4
    const css = `
      @page { size: A4; margin: 16mm; }
      * { box-sizing: border-box; }
      body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif; color: #111; }
      h1 { font-size: 22px; margin: 0 0 2px; }
      .role { font-size: 12px; color: #555; margin-bottom: 10px; }
      h2 { font-size: 14px; margin: 14px 0 6px; }
      p, li { font-size: 12px; line-height: 1.55; margin: 0 0 6px; }
      ul { padding-left: 16px; margin: 0; }
      .hr { height: 1px; background: #e5e5e5; margin: 10px 0; }
      .row { display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; }
      .company { font-weight: 600; }
      .year { color: #666; font-size: 11px; margin-left: 8px; }
      .chip { display:inline-block; font-size:11px; background:#f3f4f6; border:1px solid #e5e7eb; color:#111; padding:3px 7px; border-radius:999px; margin:2px 6px 0 0; }
      .header { display:flex; align-items:flex-start; justify-content:space-between; gap: 12px; }
      .muted { color:#555; }
    `;

    const careerHtml = career
      .map(
        (c) => `
          <div class="item">
            <div class="row">
              <span class="company">${c.title} — ${c.company}</span>
              <span class="year">${c.year}</span>
            </div>
            <p>${c.description}</p>
          </div>
        `
      )
      .join("");

    const aboutHtml = aboutBlocks
      .map((txt) => `<p>${txt.replace(/\n{2,}/g, "\n").replace(/\n/g, "<br/>")}</p>`)
      .join("");

    // você pode editar as “chips” abaixo se quiser listar stack resumido
    const chipsHtml = [
      "Python", "C/C++", "Java", "JavaScript (React/Next.js)",
      "Computer Vision (YOLO)", "Node.js", "SQL",
    ]
      .map((x) => `<span class="chip">${x}</span>`)
      .join("");

    const html = `
      <!doctype html>
      <html><head><meta charset="utf-8"/><style>${css}</style></head>
      <body>
        <div class="header">
          <div>
            <h1>${t.name}</h1>
            <div class="role">${t.role}</div>
          </div>
          <div class="muted" style="text-align:right; font-size:11px;">
            ${CONTACT.email}<br/>${contactAddress}
          </div>
        </div>

        <div class="hr"></div>

        <h2>${t.sections.summary}</h2>
        <p>${heroSentence}</p>

        <h2>${t.sections.about}</h2>
        ${aboutHtml || "<p class='muted'>—</p>"}

        <h2>${t.sections.career}</h2>
        ${careerHtml || "<p class='muted'>—</p>"}

        <h2>${t.sections.contact}</h2>
        <p><strong>${t.labels.phone}:</strong> ${CONTACT.phone}</p>
        <p><strong>${t.labels.email}:</strong> ${CONTACT.email}</p>
        <p><strong>${t.labels.address}:</strong> ${contactAddress}</p>
        <p><strong>${t.labels.github}:</strong> ${CONTACT.github}</p>
        <p><strong>${t.labels.linkedin}:</strong> ${CONTACT.linkedin}</p>

        <div style="margin-top:8px">${chipsHtml}</div>
      </body></html>
    `;

    return html;
  }, [collectResumeBlocks, heroSentence, lang, t]);

  const onDownload = useCallback(async () => {
    try {
      setLoading(true);
      // import dinâmico robusto
      const mod: any = await import("html2pdf.js");
      const html2pdf = mod.default || mod;

      const html = makeHtml();

      const opt = {
        margin: 10,
        filename: COPY[lang].file,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
      };

      await html2pdf().from(html).set(opt).save();
    } catch (e) {
      console.error(e);
      alert(
        lang === "pt"
          ? "Não foi possível gerar o PDF. Verifique o console."
          : "Could not generate the PDF. Check the console."
      );
    } finally {
      setLoading(false);
    }
  }, [lang, makeHtml]);

  return (
    <button
      onClick={onDownload}
      disabled={loading}
      aria-label={t.btn}
      className={[
        "fixed right-4 bottom-4 z-[80]",
        "rounded-full border border-white/15 bg-white/10 backdrop-blur",
        "px-4 py-2 text-sm md:text-base text-white",
        "hover:bg-white/14 active:scale-[0.98] transition",
        loading ? "opacity-60 cursor-not-allowed" : ""
      ].join(" ")}
    >
      {loading
        ? (lang === "pt" ? "Gerando..." : "Generating...")
        : t.btn}
    </button>
  );
}
