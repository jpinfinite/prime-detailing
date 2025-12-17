'use client';

import Link from 'next/link';

interface ContentPillarsProps {
    locale: string;
}

export default function ContentPillars({ locale }: ContentPillarsProps) {
    const pillars = [
        {
            icon: '🧽',
            title: 'Guias de Detailing',
            description: 'Tutoriais completos passo a passo para polimento, vitrificação, higienização e mais',
            href: '/artigos?categoria=Tutoriais',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: '🛠️',
            title: 'Reviews de Produtos',
            description: 'Análises reais de politrizes, ceras, selantes e equipamentos testados na prática',
            href: '/artigos?categoria=Reviews',
            color: 'from-yellow-500 to-yellow-600',
        },
        {
            icon: '🚘',
            title: 'Cuidados Automotivos',
            description: 'Técnicas profissionais de manutenção, proteção e conservação da pintura',
            href: '/artigos?categoria=Técnicas',
            color: 'from-green-500 to-green-600',
        },
    ];

    return (
        <section className="py-20 bg-prime-gray-dark">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Conteúdo <span className="text-prime-yellow">Profissional</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Aprenda com guias práticos, reviews honestos e técnicas comprovadas
                    </p>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <Link
                            key={index}
                            href={pillar.href}
                            className="group bg-prime-gray-medium rounded-2xl p-8 border border-prime-gray-light hover:border-prime-yellow transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Icon */}
                            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                                {pillar.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-prime-yellow transition-colors">
                                {pillar.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {pillar.description}
                            </p>

                            {/* CTA */}
                            <div className="flex items-center text-prime-yellow font-semibold group-hover:gap-3 transition-all">
                                <span>Explorar</span>
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
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
