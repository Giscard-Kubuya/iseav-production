"use client";

import { useEffect } from "react";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

interface DynamicSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export default function DynamicSEO({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl
}: DynamicSEOProps) {
  const { settings, website, loading } = useWebsiteSettings();

  useEffect(() => {
    if (loading) return;

    // Use page-specific data or fallback to website defaults
    const pageTitle = title || settings?.seo?.metaTitle || website?.name || 'INFONET';
    const pageDescription = description || settings?.seo?.metaDescription || website?.description || '';
    const pageKeywords = keywords || settings?.seo?.metaKeywords || '';
    
    // Update document title
    document.title = pageTitle;

    // Update meta description
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', pageDescription);

    // Update meta keywords
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (pageKeywords) {
      if (!keywordsTag) {
        keywordsTag = document.createElement('meta');
        keywordsTag.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.setAttribute('content', pageKeywords);
    } else if (keywordsTag) {
      keywordsTag.remove();
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    updateOGTag('og:title', pageTitle);
    updateOGTag('og:description', pageDescription);
    updateOGTag('og:type', 'website');
    updateOGTag('og:site_name', website?.name || 'INFONET');
    
    if (ogImage || settings?.appearance?.logo) {
      updateOGTag('og:image', ogImage || settings?.appearance?.logo || '');
    }

    if (canonicalUrl) {
      updateOGTag('og:url', canonicalUrl);
    }

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', pageTitle);
    updateTwitterTag('twitter:description', pageDescription);
    
    if (ogImage || settings?.appearance?.logo) {
      updateTwitterTag('twitter:image', ogImage || settings?.appearance?.logo || '');
    }

    // Add canonical URL
    if (canonicalUrl) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonicalUrl);
    }

    // Google Analytics
    if (settings?.seo?.googleAnalytics) {
      const gaId = settings.seo.googleAnalytics;
      
      // Remove existing GA scripts
      const existingGAScripts = document.querySelectorAll('script[data-ga-id]');
      existingGAScripts.forEach(script => script.remove());

      // Add new GA script
      const gaScript = document.createElement('script');
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      gaScript.async = true;
      gaScript.setAttribute('data-ga-id', gaId);
      document.head.appendChild(gaScript);

      // Add GA config script
      const gaConfigScript = document.createElement('script');
      gaConfigScript.setAttribute('data-ga-id', gaId);
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(gaConfigScript);
    }

    // Facebook Pixel
    if (settings?.seo?.facebookPixel) {
      const pixelId = settings.seo.facebookPixel;
      
      // Remove existing FB Pixel scripts
      const existingPixelScripts = document.querySelectorAll('script[data-fb-pixel]');
      existingPixelScripts.forEach(script => script.remove());

      // Add FB Pixel script
      const fbPixelScript = document.createElement('script');
      fbPixelScript.setAttribute('data-fb-pixel', pixelId);
      fbPixelScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbPixelScript);

      // Add noscript fallback
      const noscriptTag = document.createElement('noscript');
      noscriptTag.innerHTML = `
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />
      `;
      document.head.appendChild(noscriptTag);
    }

    // Google Site Verification
    if (settings?.seo?.googleVerification) {
      let verificationTag = document.querySelector('meta[name="google-site-verification"]');
      if (!verificationTag) {
        verificationTag = document.createElement('meta');
        verificationTag.setAttribute('name', 'google-site-verification');
        document.head.appendChild(verificationTag);
      }
      verificationTag.setAttribute('content', settings.seo.googleVerification);
    }

  }, [settings, website, loading, title, description, keywords, ogImage, canonicalUrl]);

  return null; // This component doesn't render anything
}