'use client';

import AdUnit from '../AdUnit';

export default function InArticleAd() {
  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-3xl">
        <p className="text-xs text-gray-500 text-center mb-2">Publicidade</p>
        <AdUnit 
          slot="1234567890" 
          format="fluid"
          className="min-h-[250px]"
        />
      </div>
    </div>
  );
}
