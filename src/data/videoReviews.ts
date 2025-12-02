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
  // VENETO STUDIO - PRODUTOS E TÉCNICAS
  {
    id: "veneto-cera-carnauba",
    videoId: "Gm4VIowiOt8",
    title: "Cera de Carnaúba vs Sintética",
    channel: "Veneto Studio",
    category: "Produtos",
    description: "Teste comparativo entre cera de carnaúba e sintética. Qual dura mais? Qual brilha mais? Descubra neste review completo.",
    featured: true,
  },
  {
    id: "veneto-meguiars",
    videoId: "ax8kIjxycnI",
    title: "Meguiar's Ultimate Liquid Wax - Vale a Pena?",
    channel: "Veneto Studio",
    category: "Produtos",
    description: "Review honesto da Meguiar's Ultimate Liquid Wax. Aplicação, durabilidade, brilho e custo-benefício analisados.",
    featured: true,
  },

  // TÉCNICAS - POLIMENTO
  {
    id: "veneto-polimento",
    videoId: "yVFrXDRtOKM",
    title: "Polir Carro: Guia Completo para Iniciantes",
    channel: "Veneto Studio",
    category: "Técnicas",
    description: "Aprenda a polir seu carro do zero. Politriz, boinas, compostos e técnica correta explicados passo a passo.",
    featured: true,
  },
  {
    id: "veneto-polimento-manual",
    videoId: "oR3vN8Yj0lY",
    title: "Polimento Manual vs Politriz: Qual Escolher?",
    channel: "Veneto Studio",
    category: "Técnicas",
    description: "Comparativo direto entre polimento manual e com politriz. Resultados, tempo, custo e quando usar cada um.",
  },

  // PRODUTOS - SHAMPOOS
  {
    id: "veneto-shampoos",
    videoId: "ST3DWBPpKIM",
    title: "Top 5 Shampoos Automotivos 2025",
    channel: "Veneto Studio",
    category: "Produtos",
    description: "Os 5 melhores shampoos automotivos testados. Espuma, limpeza, proteção e preço analisados.",
  },
  {
    id: "veneto-ph-neutro",
    videoId: "o4zzMjIFzws",
    title: "Por Que Usar Shampoo pH Neutro?",
    channel: "Veneto Studio",
    category: "Tutoriais",
    description: "Entenda a importância do pH neutro e como ele protege sua cera e pintura.",
  },

  // TÉCNICAS - LAVAGEM
  {
    id: "veneto-2-baldes",
    videoId: "mjlci89xi1A",
    title: "Método dos 2 Baldes: Lave Sem Riscar",
    channel: "Veneto Studio",
    category: "Tutoriais",
    description: "Técnica profissional de lavagem que evita riscos na pintura. Simples e eficaz.",
  },
  {
    id: "veneto-waterless",
    videoId: "Qoucr9Nhg5A",
    title: "Lavagem a Seco (Waterless): Como Fazer",
    channel: "Veneto Studio",
    category: "Técnicas",
    description: "Aprenda a técnica de lavagem sem água. Quando usar, produtos corretos e cuidados necessários.",
  },

  // PRODUTOS - POLITRIZES
  {
    id: "veneto-politriz",
    videoId: "nBYF_PUmB0U",
    title: "Politriz Vonder: Review Completo",
    channel: "Veneto Studio",
    category: "Produtos",
    description: "Review completo de politrizes. Prós, contras, resultados e se vale o investimento.",
  },
  {
    id: "veneto-dual-action",
    videoId: "cOeqRq3Gc6c",
    title: "Politriz Dual Action: Guia de Compra 2025",
    channel: "Veneto Studio",
    category: "Produtos",
    description: "Tudo sobre politrizes dual action. Qual comprar, como usar e melhores marcas do mercado.",
  },

  // TUTORIAIS - INTERIOR
  {
    id: "veneto-interior",
    videoId: "HsHXIAup6tE",
    title: "Limpeza Profunda do Interior: Passo a Passo",
    channel: "Veneto Studio",
    category: "Tutoriais",
    description: "Detailing completo do interior. Bancos, carpetes, painel e vidros. Resultado profissional em casa.",
  },
  {
    id: "veneto-couro",
    videoId: "8JwLPIcufvc",
    title: "Como Cuidar de Bancos de Couro",
    channel: "Veneto Studio",
    category: "Tutoriais",
    description: "Limpeza, hidratação e proteção de couro automotivo. Mantenha seus bancos sempre novos.",
  },

  // MERCADO
  {
    id: "veneto-mercado",
    videoId: "Hp5YL5Ugl2w",
    title: "Mercado de Detailing no Brasil",
    channel: "Veneto Studio",
    category: "Mercado",
    description: "Análise do mercado brasileiro de detailing. Como começar, investimento necessário e potencial de lucro.",
  },

  // PRODUTOS - CERAMIC COATING
  {
    id: "veneto-ceramic",
    videoId: "47F3o-Z8gUg",
    title: "Ceramic Coating: Vale a Pena? Review Honesto",
    channel: "Veneto Studio",
    category: "Produtos",
    description: "Review completo de ceramic coating. Aplicação, durabilidade, proteção e se realmente vale o investimento.",
  },

  // TÉCNICAS - CORREÇÃO DE PINTURA
  {
    id: "veneto-arranhoes",
    videoId: "0MgIkdcPU_E",
    title: "Como Remover Arranhões da Pintura",
    channel: "Veneto Studio",
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
