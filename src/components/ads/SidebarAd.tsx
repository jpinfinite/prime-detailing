'use client';

import AdUnit from '../AdUnit';

export default function SidebarAd() {
  return (
    <div className="sticky top-24">
      <p className="text-xs text-gray-500 text-center mb-2">Publicidade</p>
      <AdUnit
        slot="4236900463"
        format="auto"
        responsive={true}
        className="min-h-[600px]"
      />
    </div>
  );
}
