import Link from "next/link";

const translations = {
  pt: {
    title: "Categorias",
    news: "Notícias",
    education: "Educação",
    reviews: "Reviews",
    guides: "Guias",
  },
  en: {
    title: "Categories",
    news: "News",
    education: "Education",
    reviews: "Reviews",
    guides: "Guides",
  },
};

export default function Categories({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.pt;

  const categories = [
    { name: t.news, icon: "📰", href: "/categoria/noticias" },
    { name: t.education, icon: "🎓", href: "/categoria/educacao" },
    { name: t.reviews, icon: "⭐", href: "/categoria/reviews" },
    { name: t.guides, icon: "📖", href: "/categoria/guias" },
  ];

  return (
    <section className="py-16 bg-prime-gray-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">{t.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="bg-prime-gray-medium p-6 rounded-lg border border-prime-gray-light hover:border-prime-yellow transition-all text-center group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
              <h3 className="font-semibold text-lg text-text-primary group-hover:text-prime-yellow transition-colors">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
