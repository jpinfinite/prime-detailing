// Funções auxiliares para tracking de eventos

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Tracking de pageview
export const trackPageView = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

// Tracking de eventos customizados
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos específicos do site

export const trackArticleView = (slug: string, title: string, category: string) => {
  trackEvent('view_article', 'engagement', `${category}: ${title}`);
};

export const trackArticleRead = (slug: string, readPercentage: number) => {
  if (readPercentage >= 25 && readPercentage < 50) {
    trackEvent('read_25', 'engagement', slug);
  } else if (readPercentage >= 50 && readPercentage < 75) {
    trackEvent('read_50', 'engagement', slug);
  } else if (readPercentage >= 75 && readPercentage < 100) {
    trackEvent('read_75', 'engagement', slug);
  } else if (readPercentage >= 100) {
    trackEvent('read_100', 'engagement', slug);
  }
};

export const trackNewsletterSignup = (email: string) => {
  trackEvent('newsletter_signup', 'conversion', 'Newsletter');
};

export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', 'engagement', query, resultsCount);
};

export const trackSocialShare = (platform: string, articleSlug: string) => {
  trackEvent('share', 'social', `${platform}: ${articleSlug}`);
};

export const trackCategoryFilter = (category: string) => {
  trackEvent('filter_category', 'navigation', category);
};

export const trackVideoPlay = (videoId: string, videoTitle: string) => {
  trackEvent('play_video', 'engagement', videoTitle);
};

export const trackOutboundLink = (url: string, label: string) => {
  trackEvent('click', 'outbound', label);
};

export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', 'conversion', `${ctaName} - ${location}`);
};

// Tracking de scroll depth
export const setupScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let scrollDepths = [25, 50, 75, 100];
  let trackedDepths: number[] = [];

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

    scrollDepths.forEach(depth => {
      if (scrollPercentage >= depth && !trackedDepths.includes(depth)) {
        trackedDepths.push(depth);
        trackEvent('scroll_depth', 'engagement', `${depth}%`, depth);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Tracking de tempo na página
export const setupTimeTracking = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  const timeThresholds = [30, 60, 120, 300]; // segundos
  let trackedTimes: number[] = [];

  const interval = setInterval(() => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    timeThresholds.forEach(threshold => {
      if (timeSpent >= threshold && !trackedTimes.includes(threshold)) {
        trackedTimes.push(threshold);
        trackEvent('time_on_page', 'engagement', `${threshold}s`, threshold);
      }
    });
  }, 5000);

  return () => {
    clearInterval(interval);
  };
};
