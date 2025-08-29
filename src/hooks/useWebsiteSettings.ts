import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";

interface WebsiteSettings {
  mission?: string;
  vision?: string;
  values?: string[];
  about_us?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  social_media?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    github?: string;
  };
  privacy_policy?: string;
  terms_of_service?: string;
  legal?: {
    privacyPolicy?: string;
    termsOfService?: string;
  };
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    github?: string;
  };
  general?: {
    contactEmail?: string;
    phone?: string;
    address?: string;
    siteName?: string;
    siteDescription?: string;
  };
  appearance?: {
    logo?: string;
    favicon?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    headerStyle?: string;
    footerText?: string;
  };
  [key: string]: any; // Allow additional settings
}

interface Website {
  id: number;
  name: string;
  domain: string;
  description: string;
  settings: WebsiteSettings;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useWebsiteSettings = () => {
  const [website, setWebsite] = useState<Website | null>(null);
  const [settings, setSettings] = useState<WebsiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsiteSettings = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/website");
        const websiteData = response.data?.data || response.data;
        setWebsite(websiteData);
        // Now all settings are directly available from the unified response
        setSettings({
          ...websiteData?.settings || {},
          // Direct properties from the response
          mission: websiteData?.mission,
          vision: websiteData?.vision,
          contact_email: websiteData?.contact_email,
          contact_phone: websiteData?.contact_phone,
          phone: websiteData?.phone,
          address: websiteData?.address,
          social_media: websiteData?.social_media,
          general: websiteData?.general,
          social: websiteData?.social,
          seo: websiteData?.seo,
          legal: websiteData?.legal,
          security: websiteData?.security,
          appearance: websiteData?.appearance,
        });
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch website settings");
        console.error("Error fetching website settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsiteSettings();
  }, []);

  return { 
    website, 
    settings, 
    mission: settings.mission || '',
    vision: settings.vision || '',
    aboutUs: settings.about_us || '',
    privacyPolicy: settings.privacy_policy || settings.legal?.privacyPolicy || '',
    termsOfService: settings.terms_of_service || settings.legal?.termsOfService || '',
    socialMedia: settings.social_media || settings.social || {},
    contactEmail: settings.contact_email || settings.general?.contactEmail || '',
    contactPhone: settings.contact_phone || settings.general?.phone || '',
    address: settings.address || settings.general?.address || '',
    loading, 
    error 
  };
};