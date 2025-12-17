'use client';

import Image from 'next/image';

export default function WhyUs() {
    const differentials = [
        {
            icon: '✅',
            title: 'Conteúdo Testado',
            description: 'Todos os reviews e guias são baseados em testes reais, não em especulações',
        },
        {
            icon: '🎯',
            title: 'Direto ao Ponto',
            description: 'Sem enrolação. Informação clara, prática e aplicável imediatamente',
        },
        {
            icon: '📚',
            title: 'Sempre Atualizado',
            description: 'Novos artigos semanais com técnicas e produtos mais recentes',
        },
        {
            icon: '💡',
            title: 'Para Todos os Níveis',
            description: 'Do iniciante ao profissional, conteúdo adaptado para cada perfil',
        },
    ];

    return (
        <section className="py-20 bg-prime-black">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Por Que o <span className="text-prime-yellow">Detailing Prime</span>?
                        </h2>

                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Criado por profissionais para profissionais e entusiastas que buscam resultados reais.
                            Nada de teoria vazia — apenas técnicas comprovadas e produtos testados na prática.
                        </p>

                        {/* Differentials */}
                        <div className="space-y-6">
                            {differentials.map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-prime-yellow/10 rounded-lg flex items-center justify-center text-2xl">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-10">
                            <a
                                href="/sobre"
                                className="inline-flex items-center gap-2 text-prime-yellow font-semibold hover:gap-4 transition-all"
                            >
                                <span>Saiba Mais Sobre Nós</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Image/Visual */}
                    <div className="relative">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden border border-prime-gray-light">
                            <Image
                                src="/images/detailing-professional-work.jpg"
                                alt="Profissional de Detailing Trabalhando"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Overlay Stats */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-prime-yellow">500K+</div>
                                        <div className="text-sm text-gray-300">Palavras Publicadas</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-prime-yellow">200+</div>
                                        <div className="text-sm text-gray-300">Reviews Testados</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-prime-yellow">30K+</div>
                                        <div className="text-sm text-gray-300">Leitores Mensais</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-prime-yellow/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
