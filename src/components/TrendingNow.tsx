'use client';

import Link from 'next/link';
import Image from 'next/image';

interface TrendingNowProps {
    locale: string;
}

export default function TrendingNow({ locale }: TrendingNowProps) {
    // Discover-style headlines: curtos, curiosos, específicos
    const trending = [
        {
            title: locale === 'pt' ? 'Esse erro arruina o polimento (90% cometem)' : (locale === 'es' ? 'Este Error Arruina el Pulido (90% lo Cometen)' : 'This Mistake Ruins Polishing (90% Commit It)'),
            teaser: locale === 'pt' ? 'Profissionais revelam o erro mais comum que destrói a pintura' : (locale === 'es' ? 'Profesionales revelan el error más común que destruye la pintura' : 'Professionals reveal the most common mistake that destroys paint'),
            image: '/images/trending/polimento-erro-comum.jpg',
            href: `/${locale}/artigos/erros-comuns-polimento`,
            category: locale === 'pt' ? 'Técnicas' : (locale === 'es' ? 'Técnicas' : 'Techniques'),
        },
        {
            title: locale === 'pt' ? 'Testamos 7 ceras populares — só 2 valem a pena' : (locale === 'es' ? 'Probamos 7 Ceras Populares — Solo 2 Valen la Pena' : 'We Tested 7 Popular Waxes — Only 2 Are Worth It'),
            teaser: locale === 'pt' ? 'Resultado surpreendente após 3 meses de teste real' : (locale === 'es' ? 'Resultado sorprendente después de 3 meses de prueba real' : 'Surprising result after 3 months of real testing'),
            image: '/images/trending/teste-ceras-2024.jpg',
            href: `/${locale}/artigos/teste-ceras-automotivas`,
            category: 'Reviews',
        },
        {
            title: locale === 'pt' ? 'O detalhe que muda o brilho do carro em minutos' : (locale === 'es' ? 'El Detalle Que Cambia el Brillo del Auto en Minutos' : 'The Detail That Changes Car Shine in Minutes'),
            teaser: locale === 'pt' ? 'Técnica simples que 80% dos profissionais usam' : (locale === 'es' ? 'Técnica simple que el 80% de los profesionales usan' : 'Simple technique that 80% of professionals use'),
            image: '/images/trending/tecnica-brilho-rapido.jpg',
            href: `/${locale}/artigos/tecnica-brilho-intenso`,
            category: locale === 'pt' ? 'Guias' : (locale === 'es' ? 'Guías' : 'Guides'),
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Title - Discover Style */}
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                        <span className="text-4xl">🔥</span>
                        O Que Está Chamando Atenção Agora
                    </h2>
                </div>

                {/* Feed-Style Cards - Large Horizontal */}
                <div className="space-y-6">
                    {trending.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-prime-yellow hover:shadow-xl transition-all"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Image - High Contrast */}
                                <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-prime-yellow text-prime-black text-sm font-bold rounded">
                                        {item.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                                    {/* Title - Discover Headline */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-prime-yellow transition-colors leading-tight">
                                        {item.title}
                                    </h3>

                                    {/* Teaser - Micro Curiosity */}
                                    <p className="text-gray-600 text-lg mb-4">
                                        {item.teaser}
                                    </p>

                                    {/* CTA */}
                                    <div className="flex items-center text-prime-yellow font-semibold group-hover:gap-3 transition-all">
                                        <span>Ler Agora</span>
                                        <svg
                                            className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
