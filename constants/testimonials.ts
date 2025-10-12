// constants/testimonials.ts
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  text: string;
  avatar?: string;   // /public/testimonials/nome.jpg (opcional)
  link?: string;     // LinkedIn / site (opcional)
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Ana Martins",
    role: "CTO",
    company: "Blue Cube Digital",
    text:
      "Profissional extremamente sólido. Entregou o projeto antes do prazo, com atenção a performance e acessibilidade.",
    avatar: "/testimonials/ana.jpg",
    link: "https://www.linkedin.com/",
  },
  {
    id: "t2",
    name: "Rafael Souza",
    role: "Product Manager",
    company: "Brane Enterprises",
    text:
      "Transformou wireframes em uma UI impecável. Comunicação clara, documentação e handoff perfeitos para o time.",
    avatar: "/testimonials/rafael.jpg",
  },
  {
    id: "t3",
    name: "Júlia Lima",
    role: "Founder",
    company: "Freelance Client",
    text:
      "Trouxe ótimas ideias e fez além do combinado, incluindo automações e métricas. Recomendo sem reservas.",
    avatar: "/testimonials/julia.jpg",
  },
  {
    id: "t4",
    name: "Carlos Teixeira",
    role: "Tech Lead",
    company: "Executive Spaces",
    text:
      "Código limpo, componentização elegante e testes. Ajudou o time a subir o nível do front.",
  },
  {
    id: "t5",
    name: "Mariana Alves",
    role: "Designer",
    company: "Studio MA",
    text:
      "Integração design-dev foi fluida. Atenção a microinterações e motion fez toda a diferença.",
  },
];
