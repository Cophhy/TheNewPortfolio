// constants/career.ts
export type CareerItem = {
  title: string;
  company: string;
  year: string;       // ex.: "2017" | "2020" | "NOW"
  description: string;
};

export const CAREER: CareerItem[] = [
  {
    title: "Senior web developer",
    company: "Blue Cube Digital",
    year: "2017",
    description:
      "Developed and managed web projects, including frontend/backend, CMS dashboards, and responsive, accessible web pages.",
  },
  {
    title: "Associate Solution Leader",
    company: "Brane Enterprises",
    year: "2020",
    description:
      "Built features, product prototypes, and reusable components/microservices. Implemented UI improvements and 3D UI interfaces.",
  },
  {
    title: "Freelance & Upskilling",
    company: "Freelance",
    year: "NOW",
    description:
      "Worked for various clients providing 3D and web services, while actively upskilling across multiple areas.",
  },
];
