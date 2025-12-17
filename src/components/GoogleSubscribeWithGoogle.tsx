'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function GoogleSubscribeWithGoogle() {
    useEffect(() => {
        // Inicializar SWG quando o script carregar
        if (typeof window !== 'undefined') {
            (window as any).SWG_BASIC = (window as any).SWG_BASIC || [];
            (window as any).SWG_BASIC.push((basicSubscriptions: any) => {
                basicSubscriptions.init({
                    type: "NewsArticle",
                    isPartOfType: ["Product"],
                    isPartOfProductId: "CAow6rbeCw:openaccess",
                    clientOptions: {
                        theme: "light",
                        lang: "pt-BR"
                    },
                });
            });
        }
    }, []);

    return (
        <Script
            src="https://news.google.com/swg/js/v1/swg-basic.js"
            strategy="afterInteractive"
            async
        />
    );
}
