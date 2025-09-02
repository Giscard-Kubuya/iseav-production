import { useState, useEffect } from "react";
import { apiRequest, CompanyStatistic } from "@/lib/api";

// interface CompanyStatistic {
//   id: number;
//   name: string;
//   value: string;
//   label: string;
//   icon: string;
//   display_order: number;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
// }
// this is new update

export const useCompanyStatsFront = () => {
  const [companyStats, setCompanyStats] = useState<CompanyStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyStats = async () => {
      try {
        setLoading(true);
        const response = await apiRequest.get(
          "/company-statistics?is_active=1"
        );
        const sortedStats = (response.data.data || []).sort(
          (a: CompanyStatistic, b: CompanyStatistic) =>
            a.display_order - b.display_order
        );
        setCompanyStats(sortedStats);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch company statistics");
        console.error("Error fetching company statistics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyStats();
  }, []);

  return { companyStats, loading, error };
};
