import { useState, useEffect } from "react";
import { apiRequest, JobOffer } from "@/lib/api";

export const useJobOffersFront = (params?: { status?: string; limit?: number; featured?: boolean }) => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        setLoading(true);
        let url = "/job-offers?status=published";
        
        if (params?.status && params.status !== 'all') {
          url += `&status=${params.status}`;
        }
        
        if (params?.limit) {
          url += `&limit=${params.limit}`;
        }
        
        if (params?.featured) {
          url += `&featured=1`;
        }
        
        const response = await apiRequest.get(url);
        setJobOffers(response.data.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch job offers");
        console.error("Error fetching job offers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffers();
  }, [params?.status, params?.limit, params?.featured]);

  return { jobOffers, loading, error };
};