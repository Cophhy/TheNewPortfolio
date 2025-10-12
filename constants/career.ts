// constants/career.ts

export type Lang = "pt" | "en";

export type CareerItemI18n = {
  title: { pt: string; en: string };
  company: { pt: string; en: string };
  period: { pt: string; en: string };        // exibido como "year" nos itens flatten
  description: { pt: string; en: string };
};

export const CAREER_I18N: CareerItemI18n[] = [
  {
    title: {
      pt: "Analista Técnico em Pesquisa e Desenvolvimento",
      en: "R&D Technical Analyst",
    },
    company: {
      pt: "P&D (IA)",
      en: "R&D (AI)",
    },
    period: {
      pt: "2024 — Atualmente",
      en: "2024 — Present",
    },
    description: {
      pt: "Atuação em IA com foco em modelos YOLO para detecção e reconhecimento de objetos. Criação e curadoria de datasets personalizados, treino/validação para alta precisão e manutenção de APIs que integram as soluções de IA a aplicações e serviços, garantindo fluxo de dados contínuo e otimizado.",
      en: "AI work focused on YOLO models for object detection and recognition. Build and curate custom datasets, train/validate for high accuracy, and maintain APIs that integrate AI solutions with applications and services, ensuring a continuous and optimized data flow.",
    },
  },
  {
    title: {
      pt: "Bolsista FAPESC — Backend (Node.js)",
      en: "FAPESC Fellow — Backend (Node.js)",
    },
    company: {
      pt: "Allestec",
      en: "Allestec",
    },
    period: {
      pt: "2023 — 2024",
      en: "2023 — 2024",
    },
    description: {
      pt: "Desenvolvimento backend com Node.js, construção e manutenção de APIs robustas, uso de bancos de dados SQL e suporte a front-end com CSS/Bootstrap para criar interfaces funcionais e consistentes.",
      en: "Backend development with Node.js, building and maintaining robust APIs, working with SQL databases, and supporting front-end using CSS/Bootstrap to deliver functional, consistent interfaces.",
    },
  },
  {
    title: {
      pt: "Pesquisa — Drones como Ferramentas de Aprendizagem",
      en: "Research — Drones as Learning Tools",
    },
    company: {
      pt: "IFC",
      en: "IFC",
    },
    period: {
      pt: "2022",
      en: "2022",
    },
    description: {
      pt: "Projeto de pesquisa sobre o uso de drones no contexto educacional: elaboração de manuais, pesquisas de campo, revisão bibliográfica e workshops. Enfoque na resolução de problemas de implementação, com criação de ferramentas para tornar o uso viável em diferentes cenários.",
      en: "Research project on using drones in education: manuals, field research, literature review, and workshops. Focus on overcoming implementation challenges by creating tools that make adoption viable across scenarios.",
    },
  },
  {
    title: {
      pt: "Projeto de Extensão — Laboratório de Robótica (Robotório)",
      en: "Extension Project — Robotics Lab (Robotório)",
    },
    company: {
      pt: "IFC",
      en: "IFC",
    },
    period: {
      pt: "2020 — 2021",
      en: "2020 — 2021",
    },
    description: {
      pt: "Estímulo a práticas de programação e automação, apoio a projetos de robótica, workshops e grupos para participação em campeonatos. Espaço para tirar dúvidas e discutir ideias com os alunos.",
      en: "Encouraged programming and automation practices, supported robotics projects, ran workshops and groups for competitions, and provided a space for Q&A and idea exchange with students.",
    },
  },
  {
    title: {
      pt: "Bolsista de Pesquisa",
      en: "Research Scholar",
    },
    company: {
      pt: "IFC — Coordenação de Pesquisa",
      en: "IFC — Research Coordination",
    },
    period: {
      pt: "2019 — 2020",
      en: "2019 — 2020",
    },
    description: {
      pt: "Apoio à coordenação de pesquisa do campus: acompanhamento de rotinas e relatórios por edital, realização de reuniões, atualização/organização de planilhas, gestão de documentação e elaboração de editais.",
      en: "Supported the campus research office: tracked routines and call-based reports, held meetings, updated/organized spreadsheets, managed documentation, and prepared calls for proposals.",
    },
  },
];

/** Shape “achatado” para consumo fácil em componentes já existentes */
export type CareerItem = {
  title: string;
  company: string;
  year: string;          // mantém a chave 'year' (exibe o 'period')
  description: string;
};

/** Retorna os itens já traduzidos no formato antigo (title/company/year/description) */
export const getCareer = (lang: Lang): CareerItem[] =>
  CAREER_I18N.map((it) => ({
    title: it.title[lang],
    company: it.company[lang],
    year: it.period[lang],
    description: it.description[lang],
  }));

/** Atalhos por idioma (se preferir importar direto) */
export const CAREER_PT: CareerItem[] = getCareer("pt");
export const CAREER_EN: CareerItem[] = getCareer("en");
