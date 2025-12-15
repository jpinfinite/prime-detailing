'use client';

import AdUnit from '../AdUnit';

export default function FeedAd() {
    return (
        <div className="w-full py-4">
            <p className="text-xs text-gray-500 text-center mb-2">Publicidade</p>
            <AdUnit
                slot="9185334189"
                format="fluid"
                layoutKey="-5v+c9-i-4a+ni"
                className="block"
            />
        </div>
    );
}
