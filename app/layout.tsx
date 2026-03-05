// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import dynamic from "next/dynamic";
import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

const StarsCanvas = dynamic(
  () => import("@/components/main/star-background").then((m) => m.StarsCanvas),
  { ssr: false }
);

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import LanguageSwitcher from "@/components/sub/LanguageSwitcher";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={cn("bg-[#030014] overflow-y-scroll overflow-x-hidden", inter.className)}>
        <LanguageProvider>
          {/* Fundo de estrelas */}
          <StarsCanvas />

          {/* Header / Navbar */}
          <Navbar />

          {/* Conteúdo da página */}
          {children}

          {/* Footer */}
          <Footer />

          {/* Botão para alternar PT/EN (pode mover para o Navbar se preferir) */}
          <LanguageSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}
