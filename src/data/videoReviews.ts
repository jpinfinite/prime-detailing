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
    videoId: "dQw4w9WgXcQ", // Substitua pelo ID real do YouTube
    title: "Review Completo: Cera de Carnaúba vs Sintética",
    channel: "Detailing Brasil",
    category: "Produtos",
    description: "Teste comparativo entre cera de carnaúba e sintética. Qual dura mais? Qual brilha mais? Descubra neste review completo.",
    featured: true,
  },
  {
    id: "review-meguiars-ultimate",
    videoId: "dQw4w9WgXcQ",
    title: "Meguiar's Ultimate Liquid Wax - Vale a Pena?",
    channel: "Auto Detailing Pro",
    category: "Produtos",
    description: "Review honesto da Meguiar's Ultimate Liquid Wax. Aplicação, durabilidade, brilho e custo-benefício analisados.",
    featured: true,
  },

  // TÉCNICAS - POLIMENTO
  {
    id: "tutorial-polimento-iniciantes",
    videoId: "dQw4w9WgXcQ",
    title: "Como Polir Carro: Guia Completo para Iniciantes",
    channel: "Estética Automotiva",
    category: "Técnicas",
    description: "Aprenda a polir seu carro do zero. Politriz, boinas, compostos e técnica correta explicados passo a passo.",
    featured: true,
  },
  {
    id: "polimento-manual-vs-maquina",
    videoId: "dQw4w9WgXcQ",
    title: "Polimento Manual vs Politriz: Qual Escolher?",
    channel: "Detailing Brasil",
    category: "Técnicas",
    description: "Comparativo direto entre polimento manual e com politriz. Resultados, tempo, custo e quando usar cada um.",
  },

  // PRODUTOS - SHAMPOOS
  {
    id: "review-top-shampoos",
    videoId: "dQw4w9WgXcQ",
    title: "Top 5 Shampoos Automotivos 2025",
    channel: "Auto Detailing Pro",
    category: "Produtos",
    description: "Os 5 melhores shampoos automotivos testados. Espuma, limpeza, proteção e preço analisados.",
  },
  {
    id: "shampoo-ph-neutro",
    videoId: "dQw4w9WgXcQ",
    title: "Por Que Usar Shampoo pH Neutro?",
    channel: "Estética Automotiva",
    category: "Tutoriais",
    description: "Entenda a importância do pH neutro e como ele protege sua cera e pintura.",
  },

  // TÉCNICAS - LAVAGEM
  {
    id: "metodo-2-baldes",
    videoId: "dQw4w9WgXcQ",
    title: "Método dos 2 Baldes: Lave Sem Riscar",
    channel: "Detailing Brasil",
    category: "Tutoriais",
    description: "Técnica profissional de lavagem que evita riscos na pintura. Simples e eficaz.",
  },
  {
    id: "lavagem-sem-agua",
    videoId: "dQw4w9WgXcQ",
    title: "Lavagem a Seco (Waterless): Como Fazer",
    channel: "Auto Detailing Pro",
    category: "Técnicas",
    description: "Aprenda a técnica de lavagem sem água. Quando usar, produtos corretos e cuidados necessários.",
  },

  // PRODUTOS - POLITRIZES
  {
    id: "review-politriz-vonder",
    videoId: "dQw4w9WgXcQ",
    title: "Politriz Vonder: Review Completo",
    channel: "Estética Automotiva",
    category: "Produtos",
    description: "Review da politriz Vonder para iniciantes. Prós, contras, resultados e se vale o investimento.",
  },
  {
    id: "politriz-dual-action",
    videoId: "dQw4w9WgXcQ",
    title: "Politriz Dual Action: Guia de Compra 2025",
    channel: "Detailing Brasil",
    category: "Produtos",
    description: "Tudo sobre politrizes dual action. Qual comprar, como usar e melhores marcas do mercado.",
  },

  // TUTORIAIS - INTERIOR
  {
    id: "limpeza-interior-completa",
    videoId: "dQw4w9WgXcQ",
    title: "Limpeza Profunda do Interior: Passo a Passo",
    channel: "Auto Detailing Pro",
    category: "Tutoriais",
    description: "Detailing completo do interior. Bancos, carpetes, painel e vidros. Resultado profissional em casa.",
  },
  {
    id: "couro-automotivo",
    videoId: "dQw4w9WgXcQ",
    title: "Como Cuidar de Bancos de Couro",
    channel: "Estética Automotiva",
    category: "Tutoriais",
    description: "Limpeza, hidratação e proteção de couro automotivo. Mantenha seus bancos sempre novos.",
  },

  // MERCADO
  {
    id: "mercado-detailing-brasil",
    videoId: "dQw4w9WgXcQ",
    title: "Mercado de Detailing no Brasil: Oportunidades",
    channel: "Detailing Brasil",
    category: "Mercado",
    description: "Análise do mercado brasileiro de detailing. Como começar, investimento necessário e potencial de lucro.",
  },

  // PRODUTOS - CERAMIC COATING
  {
    id: "ceramic-coating-review",
    videoId: "dQw4w9WgXcQ",
    title: "Ceramic Coating: Vale a Pena? Review Honesto",
    channel: "Auto Detailing Pro",
    category: "Produtos",
    description: "Review completo de ceramic coating. Aplicação, durabilidade, proteção e se realmente vale o investimento.",
  },

  // TÉCNICAS - CORREÇÃO DE PINTURA
  {
    id: "remover-arranhoes",
    videoId: "dQw4w9WgXcQ",
    title: "Como Remover Arranhões da Pintura",
    channel: "Estética Automotiva",
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
