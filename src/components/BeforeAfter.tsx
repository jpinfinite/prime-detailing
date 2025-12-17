'use client';

export default function BeforeAfter() {
    return (
        <section className="py-20 bg-prime-black">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Split Screen Before/After Effect */}
                    <div className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-prime-gray-light mb-8 group cursor-pointer">
                        {/* BEFORE - Left Side (Dull) */}
                        <div className="absolute inset-0 w-1/2 left-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 transition-all group-hover:w-1/3">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-white/40 text-8xl mb-4">😞</div>
                                    <div className="bg-black/50 px-6 py-3 rounded-lg">
                                        <p className="text-white text-2xl font-bold">ANTES</p>
                                        <p className="text-gray-300 text-sm mt-1">Sem técnica</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AFTER - Right Side (Glossy) */}
                        <div className="absolute inset-0 w-1/2 right-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 transition-all group-hover:w-2/3">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-white/90 text-8xl mb-4">✨</div>
                                    <div className="bg-black/50 px-6 py-3 rounded-lg">
                                        <p className="text-white text-2xl font-bold">DEPOIS</p>
                                        <p className="text-gray-200 text-sm mt-1">Com técnica certa</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider Line */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white shadow-2xl z-10 transition-all group-hover:left-1/3">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                        </div>

                        {/* Hover Hint */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            Passe o mouse para comparar
                        </div>
                    </div>

                    {/* Minimal Text - Discover loves visual shock */}
                    <div className="text-center">
                        <p className="text-2xl md:text-3xl text-white font-light">
                            O resultado vem da <span className="text-prime-yellow font-bold">técnica</span> — não da sorte
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
