"use client";

import Link from "next/link";
import { useLang } from "@/components/providers/LanguageProvider";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.58 2.37 1.12 2.95.85.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.1 0-1.13.39-2.06 1.03-2.78-.1-.26-.45-1.3.1-2.71 0 0 .85-.28 2.8 1.06a9.35 9.35 0 0 1 5.1 0c1.95-1.34 2.8-1.06 2.8-1.06.55 1.41.2 2.45.1 2.71.64.72 1.03 1.65 1.03 2.78 0 3.97-2.34 4.84-4.57 5.09.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.83v1.98h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V23H16.9v-6.49c0-1.55-.03-3.55-2.16-3.55-2.16 0-2.49 1.69-2.49 3.44V23H8.5V8.5z" />
    </svg>
  );
}

const CONTACT = {
  phone: "+55 (47) 98906-8550",
  email: "brendhaiara@hotmail.com",
  address_pt: "São Bento do Sul, Santa Catarina - Brasil",
  address_en: "São Bento do Sul, Santa Catarina - Brazil",
  github: "https://github.com/Cophhy",
  linkedin: "https://linkedin.com/in/brendha-gruber", // ajuste se tiver URL específica
};

const COPY = {
  pt: {
    contact: "Contato",
    phone: "Telefone",
    email: "Email",
    address: "Endereço",
    social: "Redes",
    thanks_title: "Obrigada pela atenção!",
    thanks_text:
      "Agradeço por visitar meu portfólio. Fique à vontade para entrar em contato para colaborações, oportunidades ou para bater um papo sobre IA, visão computacional e desenvolvimento.",
    rights: "Todos os direitos reservados.",
  },
  en: {
    contact: "Contact",
    phone: "Phone",
    email: "Email",
    address: "Address",
    social: "Social",
    thanks_title: "Thanks for your attention!",
    thanks_text:
      "Thanks for visiting my portfolio. Feel free to reach out for collaborations, opportunities, or just to chat about AI, computer vision, and development.",
    rights: "All rights reserved.",
  },
} as const;

export const Footer = () => {
  const { lang } = useLang();
  const t = COPY[lang];

  return (
    <footer
      id="footer"
      className="w-full bg-transparent text-gray-200 shadow-lg p-[15px]"
    >
      <div className="w-full flex flex-col items-center justify-center m-auto">
        {/* GRADE: 3 colunas no desktop, 1 no mobile */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start">
          {/* Coluna 1: Telefone + Endereço */}
          <div className="min-w-[240px] h-auto flex flex-col items-start">
            <h3 className="font-bold text-[16px] mb-3">{t.contact}</h3>

            <a
              href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}
              className="flex items-center my-[8px] hover:text-white/90 transition"
            >
              <PhoneIcon className="h-5 w-5 mr-2 opacity-80" />
              <span className="text-[15px]">
                <strong className="mr-1">{t.phone}:</strong> {CONTACT.phone}
              </span>
            </a>

            <div className="flex items-center my-[8px]">
              <MapPinIcon className="h-5 w-5 mr-2 opacity-80" />
              <span className="text-[15px]">
                <strong className="mr-1">{t.address}:</strong>{" "}
                {lang === "pt" ? CONTACT.address_pt : CONTACT.address_en}
              </span>
            </div>
          </div>

          {/* Coluna 2: Email + Social */}
          <div className="min-w-[240px] h-auto flex flex-col items-start">
            <h3 className="font-bold text-[16px] mb-3">{t.social}</h3>

            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center my-[8px] hover:text-white/90 transition"
            >
              <EnvelopeIcon className="h-5 w-5 mr-2 opacity-80" />
              <span className="text-[15px]">
                <strong className="mr-1">{t.email}:</strong> {CONTACT.email}
              </span>
            </a>

            <Link
              href={CONTACT.github}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center my-[8px] hover:text-white/90 transition"
            >
              <GitHubIcon className="h-5 w-5 mr-2 opacity-80" />
              <span className="text-[15px]">GitHub</span>
            </Link>

            <Link
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center my-[8px] hover:text-white/90 transition"
            >
              <LinkedinIcon className="h-5 w-5 mr-2 opacity-80" />
              <span className="text-[15px]">LinkedIn</span>
            </Link>
          </div>

          {/* Coluna 3: Agradecimento */}
          <div className="min-w-[240px] h-auto flex flex-col items-start">
            <h3 className="font-bold text-[16px] mb-3">{t.thanks_title}</h3>
            <p className="text-[15px] text-gray-300/95 leading-relaxed">
              {t.thanks_text}
            </p>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-5 mb-[10px] text-[14px] text-center text-gray-300/90">
          &copy; Brendha {new Date().getFullYear()}. {t.rights}
        </div>
      </div>
    </footer>
  );
};
