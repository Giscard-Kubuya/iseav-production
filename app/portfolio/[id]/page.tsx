import PortfolioDetailContent from '@/components/pages/PortfolioDetailContent'

interface PortfolioDetailPageProps {
  params: {
    id: string
  }
}

export default function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  return <PortfolioDetailContent id={params.id} />
}