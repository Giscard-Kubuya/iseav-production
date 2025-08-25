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
        setSettings(websiteData?.settings || {});
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
    loading, 
    error 
  };
};