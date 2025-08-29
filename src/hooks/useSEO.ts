"use client";

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export const useSEO = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  noIndex = false,
  noFollow = false
}: SEOProps) => {
  useEffect(() => {
    // Handle robots meta tag
    if (noIndex || noFollow) {
      let robotsTag = document.querySelector('meta[name="robots"]');
      if (!robotsTag) {
        robotsTag = document.createElement('meta');
        robotsTag.setAttribute('name', 'robots');
        document.head.appendChild(robotsTag);
      }
      
      const robotsContent = [];
      if (noIndex) robotsContent.push('noindex');
      if (noFollow) robotsContent.push('nofollow');
      if (!noIndex) robotsContent.push('index');
      if (!noFollow) robotsContent.push('follow');
      
      robotsTag.setAttribute('content', robotsContent.join(', '));
    }

    // Cleanup function to reset robots tag when component unmounts
    return () => {
      if (noIndex || noFollow) {
        const robotsTag = document.querySelector('meta[name="robots"]');
        if (robotsTag) {
          robotsTag.setAttribute('content', 'index, follow');
        }
      }
    };
  }, [noIndex, noFollow]);

  // Return the SEO data to be passed to DynamicSEO component
  return {
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
  };
};

// Utility function for common page types
export const getPageSEO = (
  type: 'blog' | 'portfolio' | 'service' | 'about' | 'contact' | 'news',
  data?: {
    title?: string;
    description?: string;
    image?: string;
    slug?: string;
  }
) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  const seoConfigs = {
    blog: {
      title: data?.title ? `${data.title} - Blog INFONET` : 'Blog - INFONET',
      description: data?.description || 'Découvrez nos articles sur les technologies et innovations IT au Burundi.',
      canonicalUrl: data?.slug ? `${baseUrl}/blog/${data.slug}` : `${baseUrl}/blog`,
      ogImage: data?.image,
    },
    portfolio: {
      title: data?.title ? `${data.title} - Portfolio INFONET` : 'Portfolio - INFONET',
      description: data?.description || 'Découvrez nos projets et réalisations en solutions informatiques.',
      canonicalUrl: data?.slug ? `${baseUrl}/portfolio/${data.slug}` : `${baseUrl}/portfolio`,
      ogImage: data?.image,
    },
    service: {
      title: data?.title ? `${data.title} - Services INFONET` : 'Services - INFONET',
      description: data?.description || 'Nos services en solutions informatiques et technologies numériques.',
      canonicalUrl: `${baseUrl}/services`,
      ogImage: data?.image,
    },
    about: {
      title: 'À Propos - INFONET',
      description: 'Découvrez INFONET, leader en solutions informatiques au Burundi. Notre mission, vision et équipe.',
      canonicalUrl: `${baseUrl}/about`,
    },
    contact: {
      title: 'Contact - INFONET',
      description: 'Contactez-nous pour vos besoins en solutions informatiques. Bureaux à Bujumbura, Burundi.',
      canonicalUrl: `${baseUrl}/contact`,
    },
    news: {
      title: data?.title ? `${data.title} - Actualités INFONET` : 'Actualités - INFONET',
      description: data?.description || 'Restez informés de nos dernières actualités et événements.',
      canonicalUrl: data?.slug ? `${baseUrl}/actualites/${data.slug}` : `${baseUrl}/actualites`,
      ogImage: data?.image,
    },
  };

  return seoConfigs[type];
};