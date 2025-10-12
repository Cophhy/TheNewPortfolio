// constants/experience.ts
export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  tech?: string[];
  logoSrc?: string; // opcional: /public/... (se quiser)
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "WEG • IPEX",
    role: "Full-stack & ML Engineer",
    period: "2022 — Presente",
    location: "Santa Catarina, BR (remoto)",
    bullets: [
      "Frontend React/AG-Grid para relatórios e perfis de grid.",
      "Microserviços Quarkus + integrações Dremio.",
      "Datasets e pipelines CV/YOLO → HuggingFace."
    ],
    tech: ["React", "Next.js", "TypeScript", "Quarkus", "AG-Grid", "HF"],
  },
  {
    company: "Pesquisa Jr. (Freelance)",
    role: "Computer Vision Researcher",
    period: "2024 — 2025",
    bullets: [
      "Curadoria de imagens de linhas de transmissão (TLT) e taxonomias.",
      "Modelos de detecção e classificação (oxid., ninho, protr.)."
    ],
    tech: ["YOLO", "PyTorch", "Python", "Datasets"],
  },
  {
    company: "Projetos Pessoais",
    role: "Dev & Designer",
    period: "2019 — 2024",
    bullets: [
      "Apps Expo/React-Native com UI-Kitten e animações.",
      "Portfólios 3D/Three.js e automações CI/CD GitLab."
    ],
    tech: ["Expo", "UI-Kitten", "Three.js", "CI/CD"],
  },
];
