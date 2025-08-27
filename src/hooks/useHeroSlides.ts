import { useState, useEffect } from "react";
import { apiRequest, HeroSlide } from "@/lib/api";

export const useHeroSlides = () => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        setLoading(true);

        const response = await apiRequest.get("/hero-slides");
        setHeroSlides(response.data.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch hero slides");
        console.error("Error fetching hero slides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSlides();
  }, []);

  return { heroSlides, loading, error };
};
