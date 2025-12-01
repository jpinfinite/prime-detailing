import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Detailing Prime - Estética Automotiva Profissional",
  description: "Notícias, educação e reviews sobre estética automotiva.",
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <Header locale={params.locale} />
        <main className="min-h-screen">{children}</main>
        <Footer locale={params.locale} />
      </body>
    </html>
  );
}
