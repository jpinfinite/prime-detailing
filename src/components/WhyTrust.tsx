'use client';

export default function WhyTrust() {
    const reasons = [
        {
            icon: '✅',
            text: 'Conteúdo testado',
        },
        {
            icon: '💬',
            text: 'Linguagem direta',
        },
        {
            icon: '🚫',
            text: 'Sem publi disfarçada',
        },
        {
            icon: '🎯',
            text: 'Foco em resultado real',
        },
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                        Por Que Confiar
                    </h2>

                    {/* Bullets - Short & Direct */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {reasons.map((reason, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl mb-2">{reason.icon}</div>
                                <p className="text-gray-700 font-medium">{reason.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
