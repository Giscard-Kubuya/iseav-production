'use client'

import AboutContent from '@/components/pages/AboutContent'
import PageSEO from '@/components/layout/PageSEO'
import { getPageSEO } from '@/hooks/useSEO'

export default function AboutPage() {
  const seoData = getPageSEO('about');
  
  return (
    <PageSEO {...seoData}>
      <AboutContent />
    </PageSEO>
  )
}