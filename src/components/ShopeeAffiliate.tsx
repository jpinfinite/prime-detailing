'use client';

import Link from 'next/link';

export default function ShopeeAffiliate() {
    return (
        <div className="my-12 p-6 bg-prime-gray-medium rounded-xl border border-prime-gray-light shadow-lg hover:border-prime-yellow/50 transition-colors">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🛍️</span>
                        <h3 className="text-xl font-bold text-prime-yellow">
                            Recomendações Especiais
                        </h3>
                    </div>

                    <p className="text-text-secondary leading-relaxed">
                        Encontre os melhores produtos para estética automotiva com preços incríveis na nossa loja parceira.
                    </p>

                    <div className="text-sm text-text-muted italic bg-prime-black/30 p-3 rounded border border-prime-gray-light/30">
                        <span className="text-prime-yellow font-bold mr-1">Transparência:</span>
                        Estes são links parceiros. Ao comprar através deles, você apoia o site e eu ganho uma comissão (sem custo extra para você).
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 w-full md:w-auto shrink-0">
                    <Link
                        href="https://s.shopee.com.br/AKU3buNKiW"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap px-6 py-4 bg-gradient-yellow text-prime-black font-bold text-lg rounded-lg shadow-lg hover:brightness-110 transition-all transform hover:-translate-y-1 block text-center flex-1"
                    >
                        Oferta Destaque 1 ↗
                    </Link>

                    <Link
                        href="https://s.shopee.com.br/AAAdPhYkB9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap px-6 py-4 bg-prime-gray-dark border border-prime-yellow text-prime-yellow font-bold text-lg rounded-lg shadow-lg hover:bg-prime-yellow hover:text-prime-black transition-all transform hover:-translate-y-1 block text-center flex-1"
                    >
                        Oferta Destaque 2 ↗
                    </Link>
                </div>
            </div>
        </div>
    );
}
