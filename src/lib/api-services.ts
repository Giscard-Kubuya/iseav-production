import {
  apiRequest,
  ApiResponse,
  PaginatedResponse,
  BlogPost,
  Actualite,
  PortfolioProject,
  GalleryItem,
  HeroSlide,
  Comment,
  SiteUser,
  JobOffer,
  JobApplication,
  DashboardStats,
  Service,
  Testimonial,
  CompanyValue,
  ContactInfo,
  NewsletterSubscription,
  TechnologyPartner,
  Leadership,
  CompanyJourney,
  CompanyStatistic,
} from "./api";

// Blog Posts API
export const blogPostsApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    status?: string;
    category?: string;
    featured?: boolean;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<BlogPost>>(
      `/blog-posts?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<BlogPost>>(`/blog-posts/${id}`),

  create: (data: Partial<BlogPost>) =>
    apiRequest.post<ApiResponse<BlogPost>>("/blog-posts", data),

  update: (id: number, data: Partial<BlogPost>) =>
    apiRequest.put<ApiResponse<BlogPost>>(`/blog-posts/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/blog-posts/${id}`),

  toggleFeatured: (id: number) =>
    apiRequest.patch<ApiResponse<BlogPost>>(`/blog-posts/${id}/featured`),

  updateStatus: (id: number, status: string) =>
    apiRequest.patch<ApiResponse<BlogPost>>(`/blog-posts/${id}/status`, {
      status,
    }),
};

// Actualités API
export const actualitesApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    status?: string;
    category?: string;
    featured?: boolean;
    urgent?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<Actualite>>(
      `/actualites?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<Actualite>>(`/actualites/${id}`),

  create: (data: Partial<Actualite>) =>
    apiRequest.post<ApiResponse<Actualite>>("/actualites", data),

  update: (id: number, data: Partial<Actualite>) =>
    apiRequest.put<ApiResponse<Actualite>>(`/actualites/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/actualites/${id}`),

  toggleFeatured: (id: number) =>
    apiRequest.patch<ApiResponse<Actualite>>(`/actualites/${id}/featured`),

  toggleUrgent: (id: number) =>
    apiRequest.patch<ApiResponse<Actualite>>(`/actualites/${id}/urgent`),
};

// Portfolio Projects API
export const portfolioProjectsApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    category?: string;
    status?: string;
    featured?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<PortfolioProject>>(
      `/portfolio-projects?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<PortfolioProject>>(`/portfolio-projects/${id}`),

  create: (data: Partial<PortfolioProject>) =>
    apiRequest.post<ApiResponse<PortfolioProject>>("/portfolio-projects", data),

  update: (id: number, data: Partial<PortfolioProject>) =>
    apiRequest.put<ApiResponse<PortfolioProject>>(
      `/portfolio-projects/${id}`,
      data
    ),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/portfolio-projects/${id}`),

  toggleFeatured: (id: number) =>
    apiRequest.patch<ApiResponse<PortfolioProject>>(
      `/portfolio-projects/${id}/featured`
    ),
};

// Gallery Items API
export const galleryItemsApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    category?: string;
    featured?: boolean;
    published?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<GalleryItem>>(
      `/gallery-items?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<GalleryItem>>(`/gallery-items/${id}`),

  create: (data: Partial<GalleryItem>) =>
    apiRequest.post<ApiResponse<GalleryItem>>("/gallery-items", data),

  update: (id: number, data: Partial<GalleryItem>) =>
    apiRequest.put<ApiResponse<GalleryItem>>(`/gallery-items/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/gallery-items/${id}`),

  toggleFeatured: (id: number) =>
    apiRequest.patch<ApiResponse<GalleryItem>>(`/gallery-items/${id}/featured`),

  togglePublished: (id: number) =>
    apiRequest.patch<ApiResponse<GalleryItem>>(
      `/gallery-items/${id}/published`
    ),

  incrementViews: (id: number) =>
    apiRequest.post<ApiResponse<void>>(`/gallery-items/${id}/increment-views`),

  incrementDownloads: (id: number) =>
    apiRequest.post<ApiResponse<void>>(
      `/gallery-items/${id}/increment-downloads`
    ),
};

// Hero Slides API
export const heroSlidesApi = {
  getAll: (params?: { page?: number; per_page?: number; active?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<HeroSlide>>(
      `/hero-slides?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<HeroSlide>>(`/hero-slides/${id}`),

  create: (data: Partial<HeroSlide>) =>
    apiRequest.post<ApiResponse<HeroSlide>>("/hero-slides", data),

  update: (id: number, data: Partial<HeroSlide>) =>
    apiRequest.put<ApiResponse<HeroSlide>>(`/hero-slides/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/hero-slides/${id}`),

  toggleActive: (id: number) =>
    apiRequest.patch<ApiResponse<HeroSlide>>(
      `/hero-slides/${id}/toggle-active`
    ),
};

// Comments API
export const commentsApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    status?: string;
    commentable_type?: string;
    commentable_id?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<Comment>>(
      `/comments?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<Comment>>(`/comments/${id}`),

  create: (data: Partial<Comment>) =>
    apiRequest.post<ApiResponse<Comment>>("/comments", data),

  update: (id: number, data: Partial<Comment>) =>
    apiRequest.put<ApiResponse<Comment>>(`/comments/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/comments/${id}`),

  updateStatus: (id: number, status: string) =>
    apiRequest.patch<ApiResponse<Comment>>(`/comments/${id}/status`, {
      status,
    }),

  approve: (id: number) =>
    apiRequest.post<ApiResponse<Comment>>(`/comments/${id}/approve`),

  reject: (id: number) =>
    apiRequest.post<ApiResponse<Comment>>(`/comments/${id}/reject`),

  markAsSpam: (id: number) =>
    apiRequest.post<ApiResponse<Comment>>(`/comments/${id}/spam`),
};

// Site Users API
export const siteUsersApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    role?: string;
    status?: string;
    search?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<SiteUser>>(
      `/site-users?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<SiteUser>>(`/site-users/${id}`),

  create: (data: Partial<SiteUser>) =>
    apiRequest.post<ApiResponse<SiteUser>>("/site-users", data),

  update: (id: number, data: Partial<SiteUser>) =>
    apiRequest.put<ApiResponse<SiteUser>>(`/site-users/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/site-users/${id}`),

  updateStatus: (id: number, status: string) =>
    apiRequest.patch<ApiResponse<SiteUser>>(`/site-users/${id}/status`, {
      status,
    }),

  updateRole: (id: number, role: string) =>
    apiRequest.patch<ApiResponse<SiteUser>>(`/site-users/${id}/role`, { role }),
};

// Job Offers API
export const jobOffersApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    status?: string;
    department?: string;
    type?: string;
    featured?: boolean;
    urgent?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<JobOffer>>(
      `/job-offers?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<JobOffer>>(`/job-offers/${id}`),

  create: (data: Partial<JobOffer>) =>
    apiRequest.post<ApiResponse<JobOffer>>("/job-offers", data),

  update: (id: number, data: Partial<JobOffer>) =>
    apiRequest.put<ApiResponse<JobOffer>>(`/job-offers/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/job-offers/${id}`),

  toggleFeatured: (id: number) =>
    apiRequest.patch<ApiResponse<JobOffer>>(`/job-offers/${id}/featured`),

  toggleUrgent: (id: number) =>
    apiRequest.patch<ApiResponse<JobOffer>>(`/job-offers/${id}/urgent`),

  updateStatus: (id: number, status: string) =>
    apiRequest.patch<ApiResponse<JobOffer>>(`/job-offers/${id}/status`, {
      status,
    }),
};

// Job Applications API
export const jobApplicationsApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    status?: string;
    job_offer_id?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<JobApplication>>(
      `/job-applications?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<JobApplication>>(`/job-applications/${id}`),

  create: (data: Partial<JobApplication>) =>
    apiRequest.post<ApiResponse<JobApplication>>("/job-applications", data),

  update: (id: number, data: Partial<JobApplication>) =>
    apiRequest.put<ApiResponse<JobApplication>>(
      `/job-applications/${id}`,
      data
    ),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/job-applications/${id}`),

  updateStatus: (id: number, status: string) =>
    apiRequest.patch<ApiResponse<JobApplication>>(
      `/job-applications/${id}/status`,
      { status }
    ),

  updateScore: (id: number, score: number) =>
    apiRequest.patch<ApiResponse<JobApplication>>(
      `/job-applications/${id}/score`,
      { score }
    ),

  scheduleInterview: (
    id: number,
    data: { date: string; time: string; location?: string }
  ) =>
    apiRequest.post<ApiResponse<JobApplication>>(
      `/job-applications/${id}/schedule-interview`,
      data
    ),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => apiRequest.get<DashboardStats>("/dashboard/stats"),
};

// Website API
export const websiteApi = {
  getCurrent: () => apiRequest.get<ApiResponse<any>>("/website"),

  update: (data: any) => apiRequest.put<ApiResponse<any>>("/website", data),

  regenerateToken: () =>
    apiRequest.post<ApiResponse<{ api_token: string }>>(
      "/website/regenerate-token"
    ),
};

// Services API
export const servicesApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    category?: string;
    status?: string;
    featured?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<Service>>(
      `/services?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<Service>>(`/services/${id}`),

  create: (data: Partial<Service>) =>
    apiRequest.post<ApiResponse<Service>>("/services", data),

  update: (id: number, data: Partial<Service>) =>
    apiRequest.put<ApiResponse<Service>>(`/services/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/services/${id}`),

  toggleActive: (id: number) =>
    apiRequest.patch<ApiResponse<Service>>(`/services/${id}/toggle-active`),

  toggleFeatured: (id: number) =>
    apiRequest.patch<ApiResponse<Service>>(`/services/${id}/toggle-featured`),

  getStats: () => apiRequest.get<ApiResponse<any>>("/services-stats"),
};

// Newsletter Subscriptions API
export const newsletterApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    interest?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<NewsletterSubscription>>(
      `/newsletter-subscriptions?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<NewsletterSubscription>>(
      `/newsletter-subscriptions/${id}`
    ),

  create: (data: Partial<NewsletterSubscription>) =>
    apiRequest.post<ApiResponse<NewsletterSubscription>>(
      "/newsletter-subscriptions",
      data
    ),

  update: (id: number, data: Partial<NewsletterSubscription>) =>
    apiRequest.put<ApiResponse<NewsletterSubscription>>(
      `/newsletter-subscriptions/${id}`,
      data
    ),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/newsletter-subscriptions/${id}`),

  toggleStatus: (id: number) =>
    apiRequest.patch<ApiResponse<NewsletterSubscription>>(
      `/newsletter-subscriptions/${id}/toggle-status`
    ),

  bulkAction: (data: { ids: number[]; action: string }) =>
    apiRequest.post<ApiResponse<void>>(
      "/newsletter-subscriptions/bulk-action",
      data
    ),

  getStats: () =>
    apiRequest.get<ApiResponse<any>>("/newsletter-subscriptions-stats"),
};

// Technology Partners API
export const technologyPartnersApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    active?: boolean;
    featured?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<TechnologyPartner>>(
      `/technology-partners?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<TechnologyPartner>>(
      `/technology-partners/${id}`
    ),

  create: (data: Partial<TechnologyPartner>) =>
    apiRequest.post<ApiResponse<TechnologyPartner>>(
      "/technology-partners",
      data
    ),

  update: (id: number, data: Partial<TechnologyPartner>) =>
    apiRequest.put<ApiResponse<TechnologyPartner>>(
      `/technology-partners/${id}`,
      data
    ),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/technology-partners/${id}`),

  toggleActive: (id: number) =>
    apiRequest.patch<ApiResponse<TechnologyPartner>>(
      `/technology-partners/${id}/toggle-active`
    ),

  toggleFeatured: (id: number) =>
    apiRequest.patch<ApiResponse<TechnologyPartner>>(
      `/technology-partners/${id}/toggle-featured`
    ),
};

// Leadership API
export const leadershipApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    active?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<Leadership>>(
      `/leadership?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<Leadership>>(`/leadership/${id}`),

  create: (data: Partial<Leadership>) =>
    apiRequest.post<ApiResponse<Leadership>>("/leadership", data),

  update: (id: number, data: Partial<Leadership>) =>
    apiRequest.put<ApiResponse<Leadership>>(`/leadership/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/leadership/${id}`),

  toggleActive: (id: number) =>
    apiRequest.patch<ApiResponse<Leadership>>(
      `/leadership/${id}/toggle-active`
    ),
};

// Company Journey API
export const companyJourneyApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    active?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<CompanyJourney>>(
      `/company-journey?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<CompanyJourney>>(`/company-journey/${id}`),

  create: (data: Partial<CompanyJourney>) =>
    apiRequest.post<ApiResponse<CompanyJourney>>("/company-journey", data),

  update: (id: number, data: Partial<CompanyJourney>) =>
    apiRequest.put<ApiResponse<CompanyJourney>>(`/company-journey/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/company-journey/${id}`),

  toggleActive: (id: number) =>
    apiRequest.patch<ApiResponse<CompanyJourney>>(
      `/company-journey/${id}/toggle-active`
    ),
};

// Company Values API (already exists in API types)
export const companyValuesApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    active?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<PaginatedResponse<CompanyValue>>(
      `/company-values?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<CompanyValue>>(`/company-values/${id}`),

  create: (data: Partial<CompanyValue>) =>
    apiRequest.post<ApiResponse<CompanyValue>>("/company-values", data),

  update: (id: number, data: Partial<CompanyValue>) =>
    apiRequest.put<ApiResponse<CompanyValue>>(`/company-values/${id}`, data),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/company-values/${id}`),

  toggleActive: (id: number) =>
    apiRequest.patch<ApiResponse<CompanyValue>>(
      `/company-values/${id}/toggle-active`
    ),
};

// Company Statistics API
export const companyStatisticsApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    active?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<ApiResponse<CompanyStatistic[]>>(
      `/company-statistics?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<CompanyStatistic>>(`/company-statistics/${id}`),

  create: (data: Partial<CompanyStatistic>) =>
    apiRequest.post<ApiResponse<CompanyStatistic>>("/company-statistics", data),

  update: (id: number, data: Partial<CompanyStatistic>) =>
    apiRequest.put<ApiResponse<CompanyStatistic>>(
      `/company-statistics/${id}`,
      data
    ),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/company-statistics/${id}`),

  toggleActive: (id: number) =>
    apiRequest.patch<ApiResponse<CompanyStatistic>>(
      `/company-statistics/${id}/toggle-active`
    ),
};

// Contact Information API
export const contactInformationApi = {
  getAll: (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    type?: string;
    is_public?: boolean;
    is_primary?: boolean;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return apiRequest.get<ApiResponse<ContactInfo[]>>(
      `/contact-information?${searchParams}`
    );
  },

  getById: (id: number) =>
    apiRequest.get<ApiResponse<ContactInfo>>(`/contact-information/${id}`),

  create: (data: Partial<ContactInfo>) =>
    apiRequest.post<ApiResponse<ContactInfo>>("/contact-information", data),

  update: (id: number, data: Partial<ContactInfo>) =>
    apiRequest.put<ApiResponse<ContactInfo>>(
      `/contact-information/${id}`,
      data
    ),

  delete: (id: number) =>
    apiRequest.delete<ApiResponse<void>>(`/contact-information/${id}`),

  togglePrimary: (id: number) =>
    apiRequest.patch<ApiResponse<ContactInfo>>(
      `/contact-information/${id}/toggle-primary`
    ),

  togglePublic: (id: number) =>
    apiRequest.patch<ApiResponse<ContactInfo>>(
      `/contact-information/${id}/toggle-public`
    ),
};
