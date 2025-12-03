export default function GoogleAdSense() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-1151448515464841';

  return (
    <>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        crossOrigin="anonymous"
      />
    </>
  );
}
