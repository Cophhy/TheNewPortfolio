"use client";

import dynamic from "next/dynamic";
const AstronautScene = dynamic(() => import("../three/AstronautScene"), { ssr: false });

export default function ContactAstronaut() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 md:px-8 py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Formulário (lado esquerdo) */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8">
          <p className="uppercase tracking-widest text-sm text-zinc-400">Get in touch</p>
          <h2 className="mt-1 text-4xl md:text-5xl font-extrabold text-zinc-100">Contact<span className="text-violet-300">.</span></h2>

          <form className="mt-8 space-y-6">
            <div>
              <label className="block text-sm text-zinc-300 mb-2">Your Name</label>
              <input className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-violet-400/50" placeholder="What's your name?" />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-2">Your Email</label>
              <input type="email" className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-violet-400/50" placeholder="What's your email?" />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-2">Your Message</label>
              <textarea rows={5} className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-violet-400/50" placeholder="What do you want to say?" />
            </div>
            <button type="button" className="rounded-lg border border-white/10 bg-white/[0.06] hover:bg-white/[0.1] px-5 py-2.5 text-sm text-zinc-100 transition">
              Send
            </button>
          </form>
        </div>

        {/* Canvas 3D (lado direito) */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="absolute inset-0">
            <AstronautScene />
          </div>
          {/* ratio fixo em telas menores; em desktop ocupa toda altura do card */}
          <div className="invisible pb-[65%] lg:pb-0" />
        </div>
      </div>
    </section>
  );
}
