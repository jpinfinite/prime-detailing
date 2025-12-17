'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function BeforeAfter() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let position = clientX - rect.left;
        position = Math.max(0, Math.min(position, rect.width));
        const percent = (position / rect.width) * 100;

        setSliderPosition(percent);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches[0]) handleMove(e.touches[0].clientX);
    };

    useEffect(() => {
        const handleMouseMoveGlobal = (e: MouseEvent) => {
            if (isDragging) handleMove(e.clientX);
        };

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMoveGlobal);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMoveGlobal);
        };
    }, [isDragging]);

    return (
        <section className="py-20 bg-prime-black">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Before/After Slider */}
                    <div
                        ref={containerRef}
                        className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-prime-gray-light mb-8 select-none"
                        onMouseDown={handleMouseDown}
                        onTouchStart={() => setIsDragging(true)}
                        onTouchEnd={() => setIsDragging(false)}
                        onTouchMove={handleTouchMove}
                    >
                        {/* ANTES - Background Image */}
                        <div className="absolute inset-0">
                            <Image
                                src="/images/antes-detailing.jpg"
                                alt="Carro antes do detailing - sujo e sem brilho"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1280px) 100vw, 1280px"
                                priority
                            />
                            {/* Label ANTES */}
                            <div className="absolute top-4 left-4 px-4 py-2 bg-black/70 text-white font-bold rounded-lg backdrop-blur-sm">
                                ANTES
                            </div>
                        </div>

                        {/* DEPOIS - Overlay Image with Clip */}
                        <div
                            className="absolute inset-0 transition-none"
                            style={{
                                clipPath: `inset(0 0 0 ${sliderPosition}%)`
                            }}
                        >
                            <Image
                                src="/images/depois-detailing.jpg"
                                alt="Carro depois do detailing - limpo e brilhante"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1280px) 100vw, 1280px"
                                priority
                            />
                            {/* Label DEPOIS */}
                            <div className="absolute top-4 right-4 px-4 py-2 bg-prime-yellow text-prime-black font-bold rounded-lg">
                                DEPOIS
                            </div>
                        </div>

                        {/* Slider Line */}
                        <div
                            className="absolute top-0 h-full w-0.5 bg-white shadow-2xl cursor-ew-resize z-10"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            {/* Handle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6 text-gray-900"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M8 7l-5 5m0 0l5 5m-5-5h18m0 0l-5-5m5 5l-5 5"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Hint (apenas em desktop) */}
                        <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm">
                            Arraste para comparar
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
