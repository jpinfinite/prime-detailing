'use client'

import { useEffect } from 'react';
import { trackArticleView, setupScrollTracking, setupTimeTracking } from '@/lib/analytics';

interface ArticleAnalyticsProps {
  slug: string;
  title: string;
  category: string;
}

export default function ArticleAnalytics({ slug, title, category }: ArticleAnalyticsProps) {
  useEffect(() => {
    // Track article view
    trackArticleView(slug, title, category);

    // Setup scroll tracking
    const cleanupScroll = setupScrollTracking();

    // Setup time tracking
    const cleanupTime = setupTimeTracking();

    return () => {
      if (cleanupScroll) cleanupScroll();
      if (cleanupTime) cleanupTime();
    };
  }, [slug, title, category]);

  return null;
}
