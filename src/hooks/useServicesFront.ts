import { useState, useEffect } from "react";
import { apiRequest, Service } from "@/lib/api";

export const useServicesFront = (limit?: number) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        setLoading(true);
        const url = limit ? `/services?limit=${limit}` : "/services";
        const response = await apiRequest.get(url);
        setServices(response.data.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch team experts");
        console.error("Error fetching team experts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllServices();
  }, [limit]);

  return { services, loading, error };
};
