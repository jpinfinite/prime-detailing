export interface Author {
  id: string;
  name: string;
  role: string;
  specialty: string;
  category: string;
  bio: string;
  avatar: string;
  social: {
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  stats: {
    articles: number;
    experience: string;
  };
}

export const authors: Author[] = [
  {
    id: 'carlos-mendes',
    name: 'Carlos Mendes',
    role: 'Especialista em Tutoriais',
    specialty: 'Técnicas de Polimento e Correção de Pintura',
    category: 'Tutoriais',
    bio: 'Com 15 anos de experiência em detailing profissional, Carlos é referência em ensinar técnicas de polimento e correção de pintura. Formado pela IDA (International Detailing Association), já treinou mais de 500 profissionais.',
    avatar: '/images/authors/carlos-mendes.svg',
    social: {
      instagram: '@carlosmendes_detailing',
      youtube: 'Carlos Mendes Detailing',
    },
    stats: {
      articles: 12,
      experience: '15 anos',
    },
  },
  {
    id: 'ana-silva',
    name: 'Ana Silva',
    role: 'Especialista em Reviews',
    specialty: 'Análise e Testes de Produtos Automotivos',
    category: 'Reviews',
    bio: 'Ana é química industrial especializada em produtos automotivos. Com laboratório próprio, realiza testes rigorosos de durabilidade, proteção e performance de ceras, selantes e coatings. Suas análises são baseadas em dados científicos.',
    avatar: '/images/authors/ana-silva.svg',
    social: {
      instagram: '@anasilva_reviews',
      linkedin: 'ana-silva-detailing',
    },
    stats: {
      articles: 8,
      experience: '10 anos',
    },
  },
  {
    id: 'ricardo-santos',
    name: 'Ricardo Santos',
    role: 'Especialista em Produtos',
    specialty: 'Comparativos e Recomendações de Produtos',
    category: 'Produtos',
    bio: 'Ricardo trabalhou 8 anos como gerente de produtos em grandes marcas de detailing. Conhece profundamente a composição, aplicação e custo-benefício de cada produto do mercado. Suas recomendações são sempre práticas e honestas.',
    avatar: '/images/authors/ricardo-santos.svg',
    social: {
      instagram: '@ricardosantos_auto',
      youtube: 'Ricardo Santos Auto',
    },
    stats: {
      articles: 10,
      experience: '8 anos',
    },
  },
  {
    id: 'juliana-costa',
    name: 'Juliana Costa',
    role: 'Especialista em Técnicas',
    specialty: 'Métodos Profissionais e Inovações',
    category: 'Técnicas',
    bio: 'Juliana é detailer profissional certificada e instrutora. Especializada em técnicas avançadas de ceramic coating, PPF e restauração de pintura. Atende carros de luxo e coleção, sempre buscando as técnicas mais modernas do mercado internacional.',
    avatar: '/images/authors/juliana-costa.svg',
    social: {
      instagram: '@julianacostadetailing',
      youtube: 'Juliana Costa Pro',
    },
    stats: {
      articles: 9,
      experience: '12 anos',
    },
  },
  {
    id: 'fernando-oliveira',
    name: 'Fernando Oliveira',
    role: 'Especialista em Mercado',
    specialty: 'Tendências e Análise de Mercado Automotivo',
    category: 'Mercado',
    bio: 'Fernando é consultor de negócios especializado no mercado de estética automotiva. MBA em Gestão Empresarial, ajuda profissionais a estruturar e escalar seus negócios de detailing. Acompanha tendências globais e oportunidades no Brasil.',
    avatar: '/images/authors/fernando-oliveira.svg',
    social: {
      linkedin: 'fernando-oliveira-consulting',
      instagram: '@fernandooliveira_business',
    },
    stats: {
      articles: 6,
      experience: '20 anos',
    },
  },
  {
    id: 'patricia-almeida',
    name: 'Patrícia Almeida',
    role: 'Especialista em Manutenção',
    specialty: 'Cuidados Preventivos e Conservação',
    category: 'Manutenção',
    bio: 'Patrícia é engenheira mecânica apaixonada por carros. Especialista em manutenção preventiva e conservação de pintura, ensina proprietários a cuidarem de seus veículos no dia a dia. Foca em soluções práticas e econômicas para manter o carro sempre impecável.',
    avatar: '/images/authors/patricia-almeida.svg',
    social: {
      instagram: '@patriciaalmeida_auto',
      youtube: 'Patrícia Almeida Carros',
    },
    stats: {
      articles: 11,
      experience: '14 anos',
    },
  },
];

// Funções auxiliares
export function getAuthorById(id: string): Author | undefined {
  return authors.find(author => author.id === id);
}

export function getAuthorByCategory(category: string): Author | undefined {
  return authors.find(author => author.category === category);
}

export function getAllAuthors(): Author[] {
  return authors;
}

export function getAuthorStats() {
  return {
    totalAuthors: authors.length,
    totalArticles: authors.reduce((sum, author) => sum + author.stats.articles, 0),
    avgExperience: Math.round(
      authors.reduce((sum, author) => sum + parseInt(author.stats.experience), 0) / authors.length
    ),
  };
}
