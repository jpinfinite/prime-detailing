'use client';

import AdUnit from '../AdUnit';

export default function MultiplexAd() {
    return (
        <div className="my-12">
            <p className="text-xs text-gray-500 text-center mb-2">Recomendado para você</p>
            <AdUnit
                slot="1498415859"
                format="autorelaxed"
                className="block"
            />
        </div>
    );
}
