"use client";

import DynamicSEO from "./DynamicSEO";
import { useSEO } from "@/hooks/useSEO";

interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  children?: React.ReactNode;
}

export default function PageSEO({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  noIndex = false,
  noFollow = false,
  children
}: PageSEOProps) {
  const seoData = useSEO({
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
    noIndex,
    noFollow
  });

  return (
    <>
      <DynamicSEO {...seoData} />
      {children}
    </>
  );
}