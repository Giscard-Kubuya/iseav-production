import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
//localhost:8080/api
const API_BASE_URL = "https://new-api.projetcepacbeni.org/api";
// const API_BASE_URL = "http://localhost:8080/api";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

// Create axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to include authentication token and website domain
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    if (typeof window !== "undefined") {
      const authData = localStorage.getItem("admin_auth");
      if (authData) {
        try {
          const { token } = JSON.parse(authData);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error parsing auth data:", error);
        }
      }
    }

    // Add static API token as fallback
    if (API_TOKEN && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }

    // Add website ID header for multi-tenant API
    config.headers["Website-ID"] = process.env.NEXT_PUBLIC_WEBSITE_ID || "8";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access - token may be invalid or expired");

      // Clear invalid auth data and redirect to login (only in browser)
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_auth");
        // Only redirect if we're not already on the login page
        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }
    } else if (error.response?.status === 404) {
      // Don't log errors for expected missing endpoints (like About API)
      const url = error.config?.url || "";
      if (url.includes("/about")) {
        // About API endpoint expected to be unavailable during development
        console.log(
          "About API endpoint not yet available - using fallback data"
        );
      } else {
        console.error("API endpoint not found:", url);
      }
    } else if (error.response?.status >= 500) {
      // Don't log server errors for expected missing endpoints
      const url = error.config?.url || "";
      if (url.includes("/about")) {
        // About API endpoint expected to have server errors during development
        console.log("About API server error - using fallback data");
      } else {
        console.error(
          "Server error:",
          error.response?.data?.message || "Internal server error"
        );
      }
    }

    return Promise.reject(error);
  }
);

// Generic API methods
export const apiRequest = {
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.get(url, config),

  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.post(url, data, config),

  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.put(url, data, config),

  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.patch(url, data, config),

  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => api.delete(url, config),
};

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface BlogPost {
  id: number;
  website_id: number;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  category: string;
  status: "published" | "draft" | "scheduled";
  publish_date?: string;
  featured: boolean;
  slug?: string;
  meta_description?: string;
  tags?: string[];
  featured_image?: string;
  views: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface Actualite {
  id: number;
  website_id: number;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  category: "company" | "projects" | "partnerships" | "events" | "awards";
  urgent: boolean;
  featured: boolean;
  publish_date: string;
  status: "published" | "draft";
  slug?: string;
  featured_image?: string;
  views: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  share_facebook?: boolean;
  share_twitter?: boolean;
  share_linkedin?: boolean;
  share_whatsapp?: boolean;
  share_telegram?: boolean;
  share_email?: boolean;
}

export interface PortfolioProject {
  id: number;
  website_id: number;
  title: string;
  description: string;
  client: string;
  category: "web" | "mobile" | "desktop" | "cloud" | "security" | "network";
  status: "completed" | "in_progress" | "planned";
  start_date: string;
  end_date?: string;
  budget?: number;
  team?: string[];
  technologies?: string[];
  featured: boolean;
  featured_image?: string;
  gallery_images?: string[];
  project_url?: string;
  repository_url?: string;
  challenges?: string;
  solutions?: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  website_id: number;
  title: string;
  description?: string;
  category: "events" | "office" | "team" | "projects" | "awards" | "training";
  image_url: string;
  thumbnail_url?: string;
  original_filename?: string;
  mime_type?: string;
  file_size?: number;
  width?: number;
  height?: number;
  uploader: string;
  tags?: string[];
  featured: boolean;
  published: boolean;
  views: number;
  downloads: number;
  alt_text?: string;
  created_at: string;
  updated_at: string;
}

export interface HeroSlide {
  id: number;
  website_id: number;
  title: string;
  subtitle?: string;
  description: string;
  image_url: string;
  primary_action_text?: string;
  primary_action_url?: string;
  secondary_action_text?: string;
  secondary_action_url?: string;
  is_active: boolean | string | number;
  display_order: number | string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  website_id: number;
  author: string;
  email: string;
  content: string;
  status: "pending" | "approved" | "rejected" | "spam";
  commentable_type: string;
  commentable_id: number;
  likes: number;
  is_reply: boolean;
  parent_id?: number;
  author_avatar?: string;
  author_website?: string;
  ip_address?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteUser {
  id: number;
  website_id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "author" | "subscriber";
  status: "active" | "inactive" | "pending" | "suspended";
  last_login?: string;
  avatar?: string;
  permissions?: string[];
  department?: string;
  phone?: string;
  login_count: number;
  articles_count: number;
  comments_count: number;
  bio?: string;
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface JobOffer {
  id: number;
  website_id: number;
  title: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
  department: string;
  type: "fulltime" | "parttime" | "contract" | "internship";
  level: "junior" | "middle" | "senior" | "lead";
  location: "bujumbura" | "gitega" | "remote" | "hybrid";
  salary_min?: number;
  salary_max?: number;
  salary_currency: "BIF" | "USD";
  status: "active" | "paused" | "closed" | "draft";
  publish_date: string;
  deadline: string;
  applications_count: number;
  views_count: number;
  featured: boolean;
  urgent: boolean;
  slug?: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: number;
  website_id: number;
  job_offer_id: number;
  candidate_name: string;
  candidate_email: string;
  candidate_phone?: string;
  cover_letter?: string;
  resume_url?: string;
  portfolio_url?: string;
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected";
  score: number;
  notes?: string;
  interview_date?: string;
  interview_time?: string;
  interview_location?: string;
  interview_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  blog_posts: number;
  actualites: number;
  portfolio_projects: number;
  gallery_items: number;
  comments: number;
  site_users: number;
  job_offers: number;
  job_applications: number;
}

export interface TeamExpert {
  id: number;
  website_id: number;
  name: string;
  position: string;
  department?: string;
  bio?: string;
  image_url?: string;
  specializations?: string[];
  certifications?: string[];
  email?: string;
  phone?: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  experience_years?: number;
  education?: string;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface TechnologyPartner {
  id: number;
  website_id: number;
  name: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  partnership_type?: string;
  display_order: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CompanyStatistic {
  id: number;
  website_id: number;
  name: string;
  value: string;
  label: string;
  icon?: string;
  color_from: string;
  color_to: string;
  text_color: string;
  animation_delay: string;
  display_order: number;
  is_active: boolean;
  show_animation: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscription {
  id: number;
  website_id: number;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  interests?: string[];
  status: "active" | "unsubscribed" | "bounced";
  subscribed_at: string;
  unsubscribed_at?: string;
  source: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  website_id: number;
  name: string;
  title: string;
  description: string;
  detailed_description?: string;
  short_description?: string;
  icon?: string;
  image_url?: string;
  starting_price?: number;
  price_unit?: string;
  features?: string[];
  technologies?: string[];
  deliverables?: string[];
  duration_estimate?: string;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  category?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
  color_from?: string;
  color_to?: string;
}

export interface Testimonial {
  id: number;
  website_id: number;
  client_name: string;
  client_position?: string;
  client_company?: string;
  content: string;
  rating: number;
  client_photo_url?: string;
  project_type?: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface CompanyValue {
  id: number;
  website_id: number;
  title: string;
  description: string;
  detailed_description?: string;
  icon?: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: number;
  website_id: number;
  type: string;
  label: string;
  value: string;
  description?: string;
  icon?: string;
  is_primary: boolean;
  is_public: boolean;
  display_order: number;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface Leadership {
  id: number;
  website_id: number;
  name: string;
  position: string;
  bio?: string;
  image_url?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  education?: string;
  experience?: string;
  expertise?: string[];
  achievements?: string;
  experience_years?: number;
  display_order: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CompanyJourney {
  id: number;
  website_id: number;
  year: string;
  title: string;
  description: string;
  icon?: string;
  details?: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface About {
  id: number;
  website_id: number;
  hero_title: string;
  hero_subtitle: string;
  organization_description: string;
  mission: string;
  vision: string;
  our_story_title?: string;
  our_story_content?: string;
  achievements?: {
    title: string;
    description: string;
    icon?: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    year: string;
    description?: string;
  }[];
  why_choose_us?: {
    title: string;
    description: string;
    icon?: string;
  }[];
  created_at: string;
  updated_at: string;
}

export default api;
