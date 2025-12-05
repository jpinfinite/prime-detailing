import Link from "next/link";

const translations = {
  pt: {
    title: "Explore por Categoria",
    subtitle: "Conteúdo organizado para você encontrar exatamente o que precisa",
    categories: [
      { 
        name: "Tutoriais", 
        icon: "🔧",
        description: "Passo a passo detalhado",
        count: "13 artigos",
        color: "from-blue-500/20 to-blue-600/20",
        href: "/artigos?categoria=Tutoriais"
      },
      { 
        name: "Reviews", 
        icon: "⭐",
        description: "Análises honestas de produtos",
        count: "8 artigos",
        color: "from-green-500/20 to-green-600/20",
        href: "/artigos?categoria=Reviews"
      },
      { 
        name: "Produtos", 
        icon: "🧴",
        description: "Comparativos e recomendações",
        count: "7 artigos",
        color: "from-purple-500/20 to-purple-600/20",
        href: "/artigos?categoria=Produtos"
      },
      { 
        name: "Técnicas", 
        icon: "🛠️",
        description: "Métodos profissionais",
        count: "16 artigos",
        color: "from-yellow-500/20 to-yellow-600/20",
        href: "/artigos?categoria=Técnicas"
      },
      { 
        name: "Mercado", 
        icon: "📈",
        description: "Tendências e novidades",
        count: "8 artigos",
        color: "from-orange-500/20 to-orange-600/20",
        href: "/artigos?categoria=Mercado"
      },
      { 
        name: "Manutenção", 
        icon: "🔩",
        description: "Cuidados e conservação",
        count: "6 artigos",
        color: "from-red-500/20 to-red-600/20",
        href: "/artigos?categoria=Manutenção"
      },
    ]
  },
  en: {
    title: "Explore by Category",
    subtitle: "Organized content to help you find exactly what you need",
    categories: [
      { 
        name: "Tutorials", 
        icon: "🔧",
        description: "Detailed step-by-step",
        count: "13 articles",
        color: "from-blue-500/20 to-blue-600/20",
        href: "/artigos?categoria=Tutoriais"
      },
      { 
        name: "Reviews", 
        icon: "⭐",
        description: "Honest product analysis",
        count: "8 articles",
        color: "from-green-500/20 to-green-600/20",
        href: "/artigos?categoria=Reviews"
      },
      { 
        name: "Products", 
        icon: "🧴",
        description: "Comparisons and recommendations",
        count: "7 articles",
        color: "from-purple-500/20 to-purple-600/20",
        href: "/artigos?categoria=Produtos"
      },
      { 
        name: "Techniques", 
        icon: "🛠️",
        description: "Professional methods",
        count: "16 articles",
        color: "from-yellow-500/20 to-yellow-600/20",
        href: "/artigos?categoria=Técnicas"
      },
      { 
        name: "Market", 
        icon: "📈",
        description: "Trends and news",
        count: "8 articles",
        color: "from-orange-500/20 to-orange-600/20",
        href: "/artigos?categoria=Mercado"
      },
      { 
        name: "Maintenance", 
        icon: "🔩",
        description: "Care and conservation",
        count: "6 articles",
        color: "from-red-500/20 to-red-600/20",
        href: "/artigos?categoria=Manutenção"
      },
    ]
  },
};

export default function Categories({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.pt;

  return (
    <section className="py-20 bg-prime-black relative overflow-hidden">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-prime-yellow/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-prime-yellow/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header da seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          {/* Linha decorativa */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-1 w-12 bg-prime-yellow"></div>
            <div className="h-2 w-2 bg-prime-yellow rotate-45"></div>
            <div className="h-1 w-12 bg-prime-yellow"></div>
          </div>
        </div>

        {/* Grid de categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative"
            >
              {/* Card com efeito hover forte */}
              <div className={`relative bg-gradient-to-br ${category.color} backdrop-blur-sm border-2 border-prime-gray-light hover:border-prime-yellow rounded-xl p-8 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-prime-yellow/20 overflow-hidden`}>
                {/* Brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-prime-yellow/0 to-prime-yellow/0 group-hover:from-prime-yellow/10 group-hover:to-transparent transition-all duration-300"></div>
                
                {/* Conteúdo */}
                <div className="relative z-10">
                  {/* Ícone grande */}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  
                  {/* Nome da categoria */}
                  <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-prime-yellow transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Descrição */}
                  <p className="text-gray-400 text-sm mb-3">
                    {category.description}
                  </p>
                  
                  {/* Contador */}
                  <div className="inline-flex items-center gap-2 bg-prime-yellow/10 border border-prime-yellow/30 rounded-full px-3 py-1">
                    <span className="text-prime-yellow font-semibold text-xs">
                      {category.count}
                    </span>
                  </div>
                </div>

                {/* Seta decorativa */}
                <div className="absolute bottom-4 right-4 text-prime-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
