import { useState, useEffect } from "react";
import { apiRequest, BlogPost } from "@/lib/api";

export const useBlogPostsFront = (params?: { category?: string; limit?: number; featured?: boolean }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        let url = "/blog-posts?status=published";
        
        if (params?.category && params.category !== 'all') {
          url += `&category=${params.category}`;
        }
        
        if (params?.limit) {
          url += `&limit=${params.limit}`;
        }
        
        if (params?.featured) {
          url += `&featured=1`;
        }
        
        const response = await apiRequest.get(url);
        setBlogPosts(response.data.data || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch blog posts");
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [params?.category, params?.limit, params?.featured]);

  return { blogPosts, loading, error };
};