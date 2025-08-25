import { useState, useEffect } from "react";
import { apiRequest, PortfolioProject } from "@/lib/api";

export const usePortfolioProjectsFront = (limit?: number) => {
  const [portfolioProjects, setPortfolioProjects] = useState<
    PortfolioProject[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPortfolioProjects = async () => {
      try {
        setLoading(true);
        const url = limit
          ? `/portfolio-projects?limit=${limit}`
          : "/portfolio-projects";
        const response = await apiRequest.get(url);
        setPortfolioProjects(response.data.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch team experts");
        console.error("Error fetching team experts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPortfolioProjects();
  }, [limit]);

  return { portfolioProjects, loading, error };
};
