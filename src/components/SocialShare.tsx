'use client'

import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track copy link
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'share', {
          method: 'copy_link',
          content_type: 'article',
          item_id: url
        });
      }
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handleShare = (platform: string) => {
    // Track social share
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform.toLowerCase(),
        content_type: 'article',
        item_id: url
      });
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: '📱',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-green-600'
    },
    {
      name: 'Facebook',
      icon: '👥',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-sky-500'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-700'
    }
  ];

  return (
    <div className="flex flex-col gap-4 p-6 bg-prime-gray-medium rounded-lg border border-prime-gray-light">
      <h3 className="text-lg font-semibold text-text-primary">
        Compartilhe este artigo
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleShare(link.name)}
            className={`flex items-center gap-2 px-4 py-2 bg-prime-gray-dark text-text-primary rounded-lg transition-colors ${link.color}`}
            aria-label={`Compartilhar no ${link.name}`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-sm font-medium">{link.name}</span>
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-prime-gray-dark text-text-primary rounded-lg hover:bg-prime-yellow hover:text-prime-black transition-colors"
          aria-label="Copiar link"
        >
          <span className="text-xl">{copied ? '✅' : '🔗'}</span>
          <span className="text-sm font-medium">
            {copied ? 'Copiado!' : 'Copiar Link'}
          </span>
        </button>
      </div>
    </div>
  );
}
