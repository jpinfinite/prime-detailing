"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchLanguage("pt")}
        className={`px-3 py-1 rounded transition-all ${
          currentLocale === "pt" 
            ? "bg-prime-yellow text-prime-black font-semibold" 
            : "text-text-secondary hover:text-prime-yellow hover:bg-prime-gray-medium"
        }`}
      >
        PT
      </button>
      <button
        onClick={() => switchLanguage("en")}
        className={`px-3 py-1 rounded transition-all ${
          currentLocale === "en" 
            ? "bg-prime-yellow text-prime-black font-semibold" 
            : "text-text-secondary hover:text-prime-yellow hover:bg-prime-gray-medium"
        }`}
      >
        EN
      </button>
    </div>
  );
}
