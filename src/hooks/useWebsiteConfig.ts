"use client";

import { useState, useEffect } from "react";
import { websiteApi } from "@/lib/api-services";

interface WebsiteConfig {
  id: string;
  name: string;
  domain: string;
  description: string;
  settings: {
    mission: string;
    vision: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    phone: string;
    social_media: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
      youtube: string;
      github: string;
      whatsapp: string;
    };
    general: {
      siteName: string;
      siteDescription: string;
      siteUrl: string;
      adminEmail: string;
      contactEmail: string;
      phone: string;
      address: string;
      timezone: string;
      language: string;
      mission: string;
      vision: string;
    };
    social: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
      youtube: string;
      github: string;
      whatsapp: string;
    };
    seo: {
      metaTitle: string;
      metaDescription: string;
      metaKeywords: string;
      googleAnalytics: string;
      facebookPixel: string;
      googleVerification: string;
    };
    appearance: {
      favicon: string;
      logo: string;
      footerText: string;
    };
  };
  is_active: boolean;
  mission: string;
  vision: string;
  contact_email: string;
  contact_phone: string;
  phone: string;
  address: string;
  social_media: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    github: string;
    whatsapp: string;
  };
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    adminEmail: string;
    contactEmail: string;
    phone: string;
    address: string;
    timezone: string;
    language: string;
    mission: string;
    vision: string;
  };
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    github: string;
    whatsapp: string;
  };
  appearance: {
    logo: string;
    favicon: string;
    footerText: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    googleAnalytics: string;
    facebookPixel: string;
    googleVerification: string;
  };
}

export function useWebsiteConfig() {
  const [websiteConfig, setWebsiteConfig] = useState<WebsiteConfig | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsiteConfig = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await websiteApi.getCurrent();

      if (response.data?.data) {
        setWebsiteConfig(response.data.data);
      } else {
        throw new Error("No website data received");
      }
    } catch (err: any) {
      console.error("Error fetching website config:", err);
      setError("Failed to load website configuration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsiteConfig();
  }, []);

  return {
    websiteConfig,
    loading,
    error,
    refetch: fetchWebsiteConfig,
  };
}
