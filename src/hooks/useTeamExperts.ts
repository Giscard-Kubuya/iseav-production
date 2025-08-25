import { useState, useEffect } from "react";
import { apiRequest, TeamExpert } from "@/lib/api";

export const useTeamExperts = (limit?: number) => {
  const [teamExperts, setTeamExperts] = useState<TeamExpert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamExperts = async () => {
      try {
        setLoading(true);
        const url = limit ? `/team-experts?limit=${limit}` : "/team-experts";
        const response = await apiRequest.get(url);
        setTeamExperts(response.data.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch team experts");
        console.error("Error fetching team experts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamExperts();
  }, [limit]);

  return { teamExperts, loading, error };
};
