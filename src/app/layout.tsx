import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager, { GoogleTagManagerNoScript } from "@/components/GoogleTagManager";
import BackToTop from "@/components/BackToTop";
import NewsletterPopup from "@/components/NewsletterPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://detailingprime.com.br'),
  title: {
    default: "Detailing Prime - Estética Automotiva Profissional",
    template: "%s | Detailing Prime"
  },
  description: "Notícias, educação e reviews sobre estética automotiva. Aprenda técnicas profissionais de detailing.",
  keywords: ["detailing", "estética automotiva", "polimento", "enceramento", "limpeza automotiva", "cera automotiva", "ceramic coating"],
  authors: [{ name: "Detailing Prime" }],
  creator: "Detailing Prime",
  publisher: "Detailing Prime",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://detailingprime.com.br',
    siteName: 'Detailing Prime',
    title: 'Detailing Prime - Estética Automotiva Profissional',
    description: 'Notícias, educação e reviews sobre estética automotiva',
    images: [
      {
        url: '/logo-principal.png',
        width: 1200,
        height: 630,
        alt: 'Detailing Prime',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detailing Prime',
    description: 'Estética Automotiva Profissional',
    images: ['/logo-principal.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <GoogleTagManager />
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION || ""} />
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID || ''}");
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerNoScript />
        <Header locale={params.locale || "pt"} />
        <main className="min-h-screen">{children}</main>
        <Footer locale={params.locale || "pt"} />
        <BackToTop />
        <NewsletterPopup />
      </body>
    </html>
  );
}
