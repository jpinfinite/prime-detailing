'use client';

import Image from 'next/image';

export default function BeforeAfter() {
    return (
        <section className="py-20 bg-prime-black">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Before/After Image */}
                    <div className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-prime-gray-light mb-8">
                        <Image
                            src="/images/before-after-detailing.png"
                            alt="Antes e depois do detailing automotivo - transformação completa"
                            fill
                            className="object-contain"
                            sizes="(max-width: 1280px) 100vw, 1280px"
                        />
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
