'use client'

import HomeContent from '@/components/pages/HomeContent'
import PageSEO from '@/components/layout/PageSEO'

export default function HomePage() {
  return (
    <PageSEO
      title="INFONET | Solutions IT et Technologies Numériques - Burundi"
      description="INFONET - Entreprise leader en solutions informatiques et technologies numériques au Burundi. Services IT, développement web, connectivité internet et solutions technologiques innovantes."
      keywords="INFONET, solutions informatiques, Burundi, développement web, technologies numériques, IT services"
    >
      <HomeContent />
    </PageSEO>
  )
}