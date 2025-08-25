import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";

interface CompanyValue {
  id: number;
  title: string;
  description: string;
  detailed_description: string;
  icon: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  color: string;
  created_at: string;
  updated_at: string;
}

export const useCompanyValuesFront = () => {
  const [companyValues, setCompanyValues] = useState<CompanyValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyValues = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/company-values?is_active=1");
        const sortedValues = (response.data.data || []).sort((a: CompanyValue, b: CompanyValue) => a.display_order - b.display_order);
        setCompanyValues(sortedValues);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch company values");
        console.error("Error fetching company values:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyValues();
  }, []);

  return { companyValues, loading, error };
};