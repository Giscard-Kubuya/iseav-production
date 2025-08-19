import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
  // Désactiver i18n pour l'instant
  // i18n: {
  //   locales: ['fr', 'en', 'ar'],
  //   defaultLocale: 'fr',
  // },
};

export default nextConfig;
