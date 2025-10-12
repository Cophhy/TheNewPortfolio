// constants/work.ts
export type WorkItem = {
  id: string;
  number: string;      // "01", "02", ...
  title: string;       // ex.: "Fendi"
  subtitle: string;    // ex.: "3D Modeling" ou "Web design and development"
  tools: string;       // linha com ferramentas
  imageSrc?: string;   // /public/.. (opcional)
  href?: string;       // link do case
};

export const WORKS: WorkItem[] = [
  {
    id: "fendi",
    number: "01",
    title: "Fendi",
    subtitle: "3D Modeling",
    tools: "Blender, Substance Painter, Low poly modeling",
    imageSrc: "/works/fendi.jpg",
    href: "#",
  },
  {
    id: "exec-spaces",
    number: "02",
    title: "Executive Spaces",
    subtitle: "Web design and development",
    tools: "Javascript, Scrollmagic, PHP, Blog admin",
    imageSrc: "/works/executive-spaces.jpg",
    href: "#",
  },
  {
    id: "games",
    number: "03",
    title: "Games",
    subtitle: "React, Typescript, Express",
    tools: "SPA, Auth flow, Reusable UI",
    imageSrc: "/works/games.jpg",
    href: "#",
  },
{
    id: "games",
    number: "04",
    title: "Games",
    subtitle: "React, Typescript, Express",
    tools: "SPA, Auth flow, Reusable UI",
    imageSrc: "/works/games.jpg",
    href: "#",
  },
  {
    id: "",
    number: "",
    title: "",
    subtitle: "",
    tools: "",
    imageSrc: "",
    href: "#",
  }
];
