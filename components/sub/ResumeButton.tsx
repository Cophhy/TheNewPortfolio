"use client";

import { useCallback, useState } from "react";
import jsPDF from "jspdf";

function isElementExcluded(el: Element | null) {
  if (!el) return false;
  // ignore se estiver dentro de seções “visuais” ou marcadas p/ sair
  return Boolean(
    el.closest("#techstack, #work, [data-no-resume]") ||
    el.closest("canvas, video, svg, nav, footer, aside")
  );
}

function getResumeNodes(root: Element): HTMLElement[] {
  // 1) Preferência: elementos marcados explicitamente
  const explicit = Array.from(
    root.querySelectorAll<HTMLElement>("[data-resume], [data-resume-section]")
  ).filter((el) => !isElementExcluded(el));
  if (explicit.length) return explicit;

  // 2) Fallback: pega headings e textos “semânticos” do <main>
  const candidates = Array.from(
    root.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,li,blockquote")
  ).filter((el) => !isElementExcluded(el));

  // remove itens vazios/ocultos
  return candidates.filter((el) => {
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
    return txt.length > 0;
  });
}

export default function ResumeButton() {
  const [busy, setBusy] = useState(false);

  const handleDownload = useCallback(async () => {
    try {
      setBusy(true);

      const root = (document.querySelector("main") as Element) || document.body;
      const nodes = getResumeNodes(root);

      // PDF base
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 48;
      const maxW = pageW - margin * 2;

      let y = margin;

      const addPageIfNeeded = (needed: number) => {
        if (y + needed > pageH - margin) {
          doc.addPage();
          y = margin;
        }
      };

      const addTitle = (text: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        const lines = doc.splitTextToSize(text, maxW);
        addPageIfNeeded(lines.length * 22 + 12);
        doc.text(lines, margin, y);
        y += lines.length * 22 + 8;
      };

      const addSubTitle = (text: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        const lines = doc.splitTextToSize(text, maxW);
        addPageIfNeeded(lines.length * 18 + 8);
        doc.text(lines, margin, y);
        y += lines.length * 18 + 6;
      };

      const addParagraph = (text: string) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(text, maxW);
        addPageIfNeeded(lines.length * 16 + 8);
        doc.text(lines, margin, y);
        y += lines.length * 16 + 10;
      };

      const addBullet = (text: string) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const bullet = "• " + text;
        const lines = doc.splitTextToSize(bullet, maxW);
        addPageIfNeeded(lines.length * 16 + 6);
        doc.text(lines, margin, y);
        y += lines.length * 16 + 6;
      };

      // Cabeçalho
      const siteTitle =
        document.querySelector("title")?.textContent?.trim() || "Resume";
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(siteTitle, margin, y);
      y += 28;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120);
      const today = new Date().toLocaleDateString();
      doc.text(`Gerado em ${today} — ${location.href}`, margin, y);
      doc.setTextColor(0);
      y += 16;

      // Varre os nodes e decide estilo por tag
      nodes.forEach((el) => {
        const tag = el.tagName.toLowerCase();
        const text = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (!text) return;

        switch (tag) {
          case "h1":
            addTitle(text);
            break;
          case "h2":
          case "h3":
          case "h4":
            addSubTitle(text);
            break;
          case "li":
            addBullet(text);
            break;
          case "blockquote":
            addParagraph(`“${text}”`);
            break;
          default:
            addParagraph(text);
        }
      });

      // Rodapé com numeração de páginas
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(
          `Página ${i} / ${pageCount}`,
          pageW - margin,
          pageH - 18,
          { align: "right" }
        );
        doc.setTextColor(0);
      }

      doc.save("resume.pdf");
    } catch (e) {
      console.error(e);
      alert("Não consegui gerar o PDF. Veja o console para detalhes.");
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <button
      onClick={handleDownload}
      disabled={busy}
      aria-label="Baixar resume (PDF)"
      className={[
        "fixed bottom-5 right-5 z-50",
        "rounded-full border border-white/10 bg-white/10 hover:bg-white/15",
        "backdrop-blur px-4 py-3 text-sm md:text-base text-zinc-100",
        "shadow-[0_8px_25px_-10px_rgba(0,0,0,0.6)]",
        "transition disabled:opacity-60 disabled:cursor-not-allowed",
      ].join(" ")}
      title="Baixar resume (PDF)"
    >
      {busy ? (
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-zinc-200 border-t-transparent" />
          Gerando…
        </span>
      ) : (
        <span className="inline-flex items-center gap-2">
          {/* ícone de download */}
          <svg width="18" height="18" viewBox="0 0 24 24" className="-mt-[1px]">
            <path d="M12 3v10m0 0l4-4m-4 4l-4-4M5 21h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Resume (PDF)
        </span>
      )}
    </button>
  );
}
