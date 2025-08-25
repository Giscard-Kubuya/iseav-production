import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";

interface CompanyJourneyItem {
  id: number;
  title: string;
  description: string;
  year: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCompanyJourneyFront = () => {
  const [companyJourney, setCompanyJourney] = useState<CompanyJourneyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyJourney = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/company-journey?is_active=1");
        const sortedItems = (response.data.data || []).sort((a: CompanyJourneyItem, b: CompanyJourneyItem) => a.display_order - b.display_order);
        setCompanyJourney(sortedItems);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch company journey");
        console.error("Error fetching company journey:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyJourney();
  }, []);

  return { companyJourney, loading, error };
};