import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o Detailing Prime - Estética Automotiva Profissional",
  description: "Conheça o Detailing Prime, seu portal completo de conteúdo sobre estética automotiva. Guias, reviews e técnicas profissionais.",
  alternates: {
    canonical: "https://detailingprime.com.br/sobre",
  },
  openGraph: {
    title: "Sobre o Detailing Prime",
    description: "Seu portal completo de estética automotiva",
    url: "https://detailingprime.com.br/sobre",
    siteName: "Detailing Prime",
    images: [{ 
      url: "https://detailingprime.com.br/logo-principal.png",
      width: 1200,
      height: 630,
    }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre o Detailing Prime",
    description: "Seu portal completo de estética automotiva",
    images: ["https://detailingprime.com.br/logo-principal.png"],
  },
};
