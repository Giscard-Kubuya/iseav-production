import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";

interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  client_company: string;
  content: string;
  rating: number;
  client_photo_url: string;
  project_type: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useTestimonialsFront = (params?: { featured?: boolean; limit?: number }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        let url = "/testimonials?is_active=1";
        
        if (params?.featured) {
          url += "&is_featured=1";
        }
        
        if (params?.limit) {
          url += `&limit=${params.limit}`;
        }
        
        const response = await apiRequest.get(url);
        const sortedTestimonials = (response.data.data || []).sort((a: Testimonial, b: Testimonial) => a.display_order - b.display_order);
        setTestimonials(sortedTestimonials);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch testimonials");
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [params?.featured, params?.limit]);

  return { testimonials, loading, error };
};