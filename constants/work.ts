// constants/work.ts
export type WorkItem = {
  id: string;
  number: string;      // "01", "02", ...
  title: string;       // ex.: "Fendi"
  subtitle: string;    // ex.: "3D Modeling" ou "Web design and development"
  tools: string;       // linha com ferramentas
  imageSrc?: string;   // /public/.. (opcional)
  href?: string;       // link do case
  description?: string; // breve descrição (texto corrido)
};

export const WORKS: WorkItem[] = [
  // 01 — Ollama + Unsloth (antes era vago)
  {
    id: "ollama-unsloth",
    number: "01",
    title: "Ollama + Unsloth Fine-tuning",
    subtitle: "LLM fine-tuning (study)",
    tools: "Python, Unsloth, Ollama, LoRA/QLoRA, Datasets, Evaluation",
    imageSrc: "/works/1.png",
    href: "https://github.com/Cophhy/Estudo-Ollama-Fine-Tuning-com-Unsloth",
    description:
      "Estudo prático de fine-tuning de LLMs locais usando Unsloth para acelerar o treinamento e Ollama para servir/inferir. O projeto cobre preparação e limpeza de datasets, configuração de LoRA/QLoRA, execução controlada do treino e exportação do adaptador para uso direto no Ollama. Inclui scripts auxiliares para testes rápidos com prompts, comparação de checkpoints e avaliação qualitativa, além de anotações sobre hiperparâmetros e boas práticas de productização.",
  },

  // 02 — DocMate
  {
    id: "docmate",
    number: "02",
    title: "DocMate",
    subtitle: "Document assistant / AI toolkit",
    tools: "TypeScript, Next.js, Node.js, PDF/Doc parsing, APIs",
    imageSrc: "/works/doc.gif",
    href: "https://github.com/Cophhy/DocMate",
    description:
      "O DocMate é um assistente para organizar e consultar documentos como PDFs e DOCX. Ele realiza extração e limpeza de texto, permitindo buscas precisas em páginas e seções, e oferece a opção de indexação por embeddings para consultas semânticas. A interface em Next.js facilita o upload e a leitura, enquanto a API em Node centraliza o processamento. O foco está em extensibilidade, com parsers e provedores de IA acopláveis, e em uma experiência leve para navegar por conteúdos densos sem fricção.",
  },

  // 03 — img2joint
  {
    id: "img2joint",
    number: "03",
    title: "img2joint",
    subtitle: "Computer vision pipeline",
    tools: "Python, OpenCV, NumPy",
    imageSrc: "/works/imgj.gif",
    href: "https://github.com/Duskthoth/img2joint",
    description:
    "O img2joint é um pipeline de visão computacional que transforma imagens em coordenadas de juntas (keypoints). O fluxo inclui pré-processamento, estimativa de pose e pós-processamento, além de utilitários para gerar e validar datasets anotados. Também há scripts de visualização que ajudam a inspecionar esqueletos e conferir métricas simples. A arquitetura é modular, permitindo trocar modelos e etapas conforme o experimento exige. A ideia final do estudo foi usar a posição da bolinha detectada para comandar um braço robótico Mitsubishi, convertendo o centroide/Keypoints em coordenadas-alvo para o manipulador.",
},


  // 04 — Site Porto da Barra Búzios
  {
    id: "portodabarra",
    number: "04",
    title: "Porto da Barra Búzios",
    subtitle: "Website",
    tools: "HTML, CSS, JavaScript",
    imageSrc: "/works/site.gif",
    href: "https://portodabarrabuzios.com.br",
    description:
      "Website institucional leve e responsivo para apresentar o espaço e seus serviços. O layout foi pensado mobile-first, com navegação direta, animações discretas e otimizações de performance e SEO. As seções de contato e localização facilitam o acesso do visitante às informações essenciais, incluindo mapas e formas de reserva. O projeto privilegia velocidade de carregamento e manutenção simples em hospedagens tradicionais.",
  },

  // 05 — PlataformaUnity (2D Game)
  {
    id: "plataformaunity",
    number: "05",
    title: "Plataforma Unity (2D Game)",
    subtitle: "Aprender fazendo • Plataforma 2D",
    tools: "Unity, C#, Animation, UI, Raycast/Boxcast, Camera, Layers/Tags",
    imageSrc: "/works/game.gif",
    href: "https://github.com/Cophhy/PlataformaUnity",
    description:
      "Projeto de jogo 2D criado para consolidar fundamentos de Unity e C#. Explora sistema de animações, colisões com Raycast/Boxcast e ajustes de física para uma movimentação fluida. Traz HUD e menus básicos, câmera com follow e efeitos de parallax, além de organização por layers/tags e uso de prefabs reutilizáveis. O roadmap inclui novas fases, inimigos, coleta de itens e polimento geral da experiência.",
  },
];
