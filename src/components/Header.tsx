import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

const translations = {
  pt: {
    home: "Início",
    articles: "Artigos",
    reviews: "Reviews",
    education: "Educação",
    about: "Sobre",
  },
  en: {
    home: "Home",
    articles: "Articles",
    reviews: "Reviews",
    education: "Education",
    about: "About",
  },
};

export default function Header({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.pt;

  return (
    <header className="bg-prime-black border-b border-prime-gray-medium sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo-principal.png"
              alt="Detailing Prime"
              width={200}
              height={60}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text-primary hover:text-prime-yellow transition-colors">
              {t.home}
            </Link>
            <Link href="/artigos" className="text-text-primary hover:text-prime-yellow transition-colors">
              {t.articles}
            </Link>
            <Link href="/reviews" className="text-text-primary hover:text-prime-yellow transition-colors">
              {t.reviews}
            </Link>
            <Link href="/educacao" className="text-text-primary hover:text-prime-yellow transition-colors">
              {t.education}
            </Link>
            <Link href="/sobre" className="text-text-primary hover:text-prime-yellow transition-colors">
              {t.about}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Menu Mobile */}
          <MobileMenu locale={locale} translations={t} />
        </div>
      </nav>
    </header>
  );
}
