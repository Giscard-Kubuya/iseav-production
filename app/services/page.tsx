'use client'

import ServicesContent from '@/components/pages/ServicesContent'
import PageSEO from '@/components/layout/PageSEO'
import { getPageSEO } from '@/hooks/useSEO'

export default function ServicesPage() {
  const seoData = getPageSEO('service');
  
  return (
    <PageSEO {...seoData}>
      <ServicesContent />
    </PageSEO>
  )
}