"use client";

import { useEffect, useState } from "react";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";

export default function DynamicFavicon() {
  const { settings, loading } = useWebsiteSettings();
  const [isClient, setIsClient] = useState(false);

  // Only run on client after hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Don't run during SSR or hydration

    // Remove default Next.js favicon first, regardless of API response
    const removeDefaultFavicons = () => {
      const existingLinks = document.querySelectorAll('link[rel*="icon"], link[rel*="shortcut"]');
      existingLinks.forEach(link => link.remove());
    };

    // Always remove default favicons
    removeDefaultFavicons();

    if (!loading && settings?.appearance?.logo) {
      // Create new favicon link with the logo from API
      const faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.type = 'image/png';
      faviconLink.href = settings.appearance.logo;

      // Create apple-touch-icon for mobile devices
      const appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.href = settings.appearance.logo;

      // Create icon for various sizes
      const icon192 = document.createElement('link');
      icon192.rel = 'icon';
      icon192.type = 'image/png';
      icon192.sizes = '192x192';
      icon192.href = settings.appearance.logo;

      const icon512 = document.createElement('link');
      icon512.rel = 'icon';
      icon512.type = 'image/png';
      icon512.sizes = '512x512';
      icon512.href = settings.appearance.logo;

      // Add all favicon variants to document head
      document.head.appendChild(faviconLink);
      document.head.appendChild(appleTouchIcon);
      document.head.appendChild(icon192);
      document.head.appendChild(icon512);
    }
  }, [settings?.appearance?.logo, loading, isClient]);

  return null; // This component doesn't render anything
}