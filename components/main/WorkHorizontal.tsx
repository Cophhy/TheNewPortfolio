"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import WorkSlide from "@/components/sub/WorkSlide";
import { WORKS } from "@/constants/work";

export default function WorkHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [pinHeight, setPinHeight] = useState<number>(0);
  const [stickyTop, setStickyTop] = useState<number>(96);
  const [titleH, setTitleH] = useState<number>(56);
  const [maxX, setMaxX] = useState<number>(0);

  // largura do spacer direito para alinhar o centro do último card ao centro do viewport
  const [tailW, setTailW] = useState<number>(24);

  const measureNavbar = () => {
    const nav =
      document.querySelector('[data-site-header]') ||
      document.querySelector("header[role='banner']") ||
      document.querySelector("header");
    const cs = nav ? getComputedStyle(nav) : null;
    if (cs && (cs.position === "fixed" || cs.position === "sticky")) {
      return (nav as HTMLElement).offsetHeight || parseFloat(cs.height) || 96;
    }
    return 96;
  };

  const recalc = useCallback(() => {
    const vw = window.innerWidth || 0;
    const vh = window.innerHeight || 0;

    const topOffset = measureNavbar();
    setStickyTop(topOffset);

    const th = titleRef.current?.offsetHeight ?? 56;
    setTitleH(th);

    // altura da área sticky (abaixo da navbar, com um pequeno gap inferior)
    const bottomGap = 20;
    const stickyHeight = Math.max(1, vh - topOffset - bottomGap);

    const viewportW = stickyRef.current?.clientWidth || vw;

    // === calcular tailW para centralizar o último card quando x chegar no fim ===
    // pega a largura do último card (não o spacer)
    const slides = trackRef.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? null;
    const lastSlide = slides && slides.length ? slides[slides.length - 1] : null;
    const lastW = lastSlide?.offsetWidth || Math.round(viewportW / 3);

    // queremos que, no fim do scroll (x = -maxX), o centro do último card esteja no centro do viewport.
    // isso é verdadeiro quando tailW = (viewportW/2 - lastW/2). Se negativo, usa 0.
    const idealTail = Math.max(0, Math.round(viewportW / 2 - lastW / 2));
    if (idealTail !== tailW) setTailW(idealTail);

    // Agora podemos medir o scrollWidth já (na próxima render o tail muda; mas temos um fallback de recalc abaixo)
    const trackEl = trackRef.current;
    const scrollW = trackEl?.scrollWidth || viewportW;

    // delta horizontal real
    const delta = Math.max(0, Math.ceil(scrollW - viewportW));

    // altura total para “pin” = altura sticky + quanto precisamos rolar para consumir todo delta
    setPinHeight(stickyHeight + delta);
    setMaxX(delta);
  }, [tailW]);

  useLayoutEffect(() => { recalc(); }, [recalc]);
  useEffect(() => {
    const onResize = () => recalc();
    const onLoad = () => recalc();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);
    // tente recalc quando as fontes carregarem
    // @ts-ignore
    document?.fonts?.ready?.then?.(recalc).catch(() => {});
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      ro = new ResizeObserver(() => recalc());
      ro.observe(trackRef.current);
    }
    // um recalc extra pra garantir após atualização do tailW
    const t = setTimeout(recalc, 60);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      if (ro) ro.disconnect();
      clearTimeout(t);
    };
  }, [recalc]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const stretched = useTransform(scrollYProgress, [0, 0.998], [0, 1], { clamp: true });
  const xRaw = useTransform(stretched, [0, 1], [0, -maxX]);
  const x = useSpring(xRaw, { stiffness: 160, damping: 32, mass: 0.4 });

  return (
    <section
      id="work"
      ref={sectionRef as any}
      style={{ height: pinHeight || "100vh" }}
      className="relative overscroll-contain"
    >
      <div
        ref={stickyRef}
        className="sticky overflow-hidden"
        style={{ top: stickyTop, height: `calc(100vh - ${stickyTop}px - 20px)` }}
      >
        {/* Título fixo */}
        <div ref={titleRef} className="absolute inset-x-0 top-0 z-10 flex items-end h-12 md:h-16 pb-2 md:pb-3">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-zinc-100 to-violet-300 bg-clip-text text-transparent">
                My <span className="font-light">Work</span>
              </span>
            </h2>
          </div>
        </div>

        {/* Trilho do carrossel (começa após o título) */}
        <div className="absolute left-0 right-0 bottom-0" style={{ top: titleH + 20 }}>
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="
              absolute inset-0
              grid grid-flow-col
              gap-0
              auto-cols-[90vw] sm:auto-cols-[60vw] md:auto-cols-[50vw] lg:auto-cols-[33.333vw]
              will-change-transform
            "
          >
            {/* Spacer esquerdo fixo (respiro) */}
            <div className="w-[18px] sm:w-[22px] md:w-[26px] lg:w-[30px]" aria-hidden />

            {/* Slides */}
            {WORKS.map((w) => (
              <div key={w.id} data-slide>
                <WorkSlide item={w} imageFirst={false} />
              </div>
            ))}

            {/* Spacer direito DINÂMICO para centralizar o último card no fim */}
            <div style={{ width: `${tailW}px` }} aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
