import PortfolioDetailContent from '@/components/pages/PortfolioDetailContent'

interface PortfolioDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { id } = await params
  return <PortfolioDetailContent id={id} />
}