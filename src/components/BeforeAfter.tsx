'use client';

export default function BeforeAfter() {
    return (
        <section className="py-20 bg-prime-black">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Visual Impact - Before/After Slider */}
                    <div className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-prime-gray-light mb-8">
                        {/* Placeholder for Before/After Slider */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-4">✨</div>
                                <p className="text-white text-xl font-semibold">Antes vs Depois</p>
                                <p className="text-gray-400 mt-2">Transformação visual real</p>
                            </div>
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
