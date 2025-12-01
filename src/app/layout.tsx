import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Detailing Prime - Estética Automotiva Profissional",
  description: "Notícias, educação e reviews sobre estética automotiva. Aprenda técnicas profissionais de detailing.",
  keywords: "detailing, estética automotiva, polimento, enceramento, limpeza automotiva",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  return (
    <html lang={params.locale || "pt"}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <Header locale={params.locale || "pt"} />
        <main className="min-h-screen">{children}</main>
        <Footer locale={params.locale || "pt"} />
      </body>
    </html>
  );
}
