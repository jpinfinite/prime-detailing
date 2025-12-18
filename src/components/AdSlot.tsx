'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

// Map textual slots to AdSense placement IDs
// User instructions: "criar os slots no AdSense"
// We use placeholders or existing IDs where appropriate.
const AD_SLOTS: Record<string, string> = {
    'compare-top': '7125135295', // Placeholder: using InArticle ID
    'compare-pre-table': '7125135295', // Placeholder
    'compare-post-table': '7125135295', // Placeholder
    'compare-bottom': '1498415859', // Placeholder: using Multiplex ID
    // Add others as needed
};

const AdUnit = dynamic(() => import('./AdUnit'), { ssr: false });

interface AdSlotProps {
    slot: string;
    className?: string;
}

export default function AdSlot({ slot, className = '' }: AdSlotProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px', // Load before it comes into view
    });

    const adSenseSlotId = AD_SLOTS[slot] || slot;

    return (
        <div ref={ref} className={`ad-slot-wrapper ${className} min-h-[280px] w-full flex justify-center items-center bg-gray-50`}>
            {inView ? (
                <Suspense fallback={<div className="h-[250px] w-[300px] animate-pulse bg-gray-200" />}>
                    <AdUnit
                        slot={adSenseSlotId}
                        format="rectangle"
                        responsive={true}
                        className="block"
                    />
                </Suspense>
            ) : (
                <div className="h-[250px] w-full" />
            )}
        </div>
    );
}
