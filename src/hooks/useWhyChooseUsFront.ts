import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";

interface WhyChooseUsItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  statistics: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useWhyChooseUsFront = () => {
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWhyChooseUs = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get("/why-choose-us?is_active=1");
        const sortedItems = (response.data.data || []).sort((a: WhyChooseUsItem, b: WhyChooseUsItem) => a.display_order - b.display_order);
        setWhyChooseUs(sortedItems);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch why choose us items");
        console.error("Error fetching why choose us items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyChooseUs();
  }, []);

  return { whyChooseUs, loading, error };
};