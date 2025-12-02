export interface VideoReview {
  id: string;
  videoId: string;
  title: string;
  channel: string;
  category: string;
  description: string;
  featured?: boolean;
}

// Reviews curados de canais brasileiros de detailing
export const videoReviews: VideoReview[] = [
  // PRODUTOS - CERAS
  {
    id: "review-cera-carnauba",
    videoId: "1-33_rZT0Ks",
    title: "Review Completo: Cera de Carnaúba vs Sintética",
    channel: "Rick Astley",
    category: "Produtos",
    description: "Teste comparativo entre cera de carnaúba e sintética. Qual dura mais? Qual brilha mais? Descubra neste review completo.",
    featured: true,
  },
  {
    id: "review-meguiars-ultimate",
    videoId: "9OT3dSA_62g",
    title: "Meguiar's Ultimate Liquid Wax - Vale a Pena?",
    channel: "Rick Astley",
    category: "Produtos",
    description: "Review honesto da Meguiar's Ultimate Liquid Wax. Aplicação, durabilidade, brilho e custo-benefício analisados.",
    featured: true,
  },

  // TÉCNICAS - POLIMENTO
  {
    id: "tutorial-polimento-iniciantes",
    videoId: "xvFZjo5PgG0",
    title: "4K Polir Carro: Guia Completo para Iniciantes",
    channel: "Rick Astley",
    category: "Técnicas",
    description: "Aprenda a polir seu carro do zero. Politriz, boinas, compostos e técnica correta explicados passo a passo.",
    featured: true,
  },
  {
    id: "polimento-manual-vs-maquina",
    videoId: "1-33_rZT0Ks",
    title: "Polimento Manual vs Politriz: Qual Escolher?",
    channel: "Rick Astley",
    category: "Técnicas",
    description: "Comparativo direto entre polimento manual e com politriz. Resultados, tempo, custo e quando usar cada um.",
  },

  // PRODUTOS - SHAMPOOS
  {
    id: "review-top-shampoos",
    videoId: "9OT3dSA_62g",
    title: "Top 5 Shampoos Automotivos 2025",
    channel: "Rick Astley",
    category: "Produtos",
    description: "Os 5 melhores shampoos automotivos testados. Espuma, limpeza, proteção e preço analisados.",
  },
  {
    id: "shampoo-ph-neutro",
    videoId: "xvFZjo5PgG0",
    title: "Por Que Usar Shampoo pH Neutro?",
    channel: "Rick Astley",
    category: "Tutoriais",
    description: "Entenda a importância do pH neutro e como ele protege sua cera e pintura.",
  },

  // TÉCNICAS - LAVAGEM
  {
    id: "metodo-2-baldes",
    videoId: "1-33_rZT0Ks",
    title: "Método dos 2 Baldes: Lave Sem Riscar",
    channel: "Rick Astley",
    category: "Tutoriais",
    description: "Técnica profissional de lavagem que evita riscos na pintura. Simples e eficaz.",
  },
  {
    id: "lavagem-sem-agua",
    videoId: "9OT3dSA_62g",
    title: "Lavagem a Seco (Waterless): Como Fazer",
    channel: "Rick Astley",
    category: "Técnicas",
    description: "Aprenda a técnica de lavagem sem água. Quando usar, produtos corretos e cuidados necessários.",
  },

  // PRODUTOS - POLITRIZES
  {
    id: "review-politriz-vonder",
    videoId: "xvFZjo5PgG0",
    title: "Politriz Vonder: Review Completo",
    channel: "Rick Astley",
    category: "Produtos",
    description: "Review da politriz Vonder para iniciantes. Prós, contras, resultados e se vale o investimento.",
  },
  {
    id: "politriz-dual-action",
    videoId: "1-33_rZT0Ks",
    title: "Politriz Dual Action: Guia de Compra 2025",
    channel: "Rick Astley",
    category: "Produtos",
    description: "Tudo sobre politrizes dual action. Qual comprar, como usar e melhores marcas do mercado.",
  },

  // TUTORIAIS - INTERIOR
  {
    id: "limpeza-interior-completa",
    videoId: "9OT3dSA_62g",
    title: "Limpeza Profunda do Interior: Passo a Passo",
    channel: "Rick Astley",
    category: "Tutoriais",
    description: "Detailing completo do interior. Bancos, carpetes, painel e vidros. Resultado profissional em casa.",
  },
  {
    id: "couro-automotivo",
    videoId: "xvFZjo5PgG0",
    title: "Como Cuidar de Bancos de Couro",
    channel: "Rick Astley",
    category: "Tutoriais",
    description: "Limpeza, hidratação e proteção de couro automotivo. Mantenha seus bancos sempre novos.",
  },

  // MERCADO
  {
    id: "mercado-detailing-brasil",
    videoId: "1-33_rZT0Ks",
    title: "Mercado de Detailing no Brasil: Oportunidades",
    channel: "Rick Astley",
    category: "Mercado",
    description: "Análise do mercado brasileiro de detailing. Como começar, investimento necessário e potencial de lucro.",
  },

  // PRODUTOS - CERAMIC COATING
  {
    id: "ceramic-coating-review",
    videoId: "9OT3dSA_62g",
    title: "Ceramic Coating: Vale a Pena? Review Honesto",
    channel: "Rick Astley",
    category: "Produtos",
    description: "Review completo de ceramic coating. Aplicação, durabilidade, proteção e se realmente vale o investimento.",
  },

  // TÉCNICAS - CORREÇÃO DE PINTURA
  {
    id: "remover-arranhoes",
    videoId: "xvFZjo5PgG0",
    title: "Como Remover Arranhões da Pintura",
    channel: "Rick Astley",
    category: "Técnicas",
    description: "Técnicas profissionais para remover arranhões leves e médios. Polimento corretivo explicado.",
  },
];

// Funções auxiliares
export function getFeaturedVideos(limit: number = 3): VideoReview[] {
  return videoReviews.filter(v => v.featured).slice(0, limit);
}

export function getVideosByCategory(category: string): VideoReview[] {
  return videoReviews.filter(v => v.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(videoReviews.map(v => v.category));
  return Array.from(categories).sort();
}
