'use client';

import Link from 'next/link';

interface CategoriesStoriesProps {
    locale: string;
}

export default function CategoriesStories({ locale }: CategoriesStoriesProps) {
    const stories = [
        {
            icon: '🧽',
            title: 'Guias que Salvam Tempo',
            description: 'Técnicas testadas que funcionam de verdade',
            href: '/artigos?categoria=Tutoriais',
            gradient: 'from-blue-500 to-blue-600',
        },
        {
            icon: '🛠️',
            title: 'Produtos Testados de Verdade',
            description: 'Reviews honestos sem publi disfarçada',
            href: '/artigos?categoria=Reviews',
            gradient: 'from-yellow-500 to-yellow-600',
        },
        {
            icon: '🚘',
            title: 'Cuidados Que Fazem Diferença',
            description: 'Manutenção que protege e valoriza',
            href: '/artigos?categoria=Técnicas',
            gradient: 'from-green-500 to-green-600',
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Grid - 3 Editorial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stories.map((story, index) => (
                        <Link
                            key={index}
                            href={story.href}
                            className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-prime-yellow transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
                        >
                            {/* Background Gradient on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                                    {story.icon}
                                </div>

                                {/* Title - Discover Style (não genérico) */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-prime-yellow transition-colors">
                                    {story.title}
                                </h3>

                                {/* Description - Benefit Clear */}
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {story.description}
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
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
