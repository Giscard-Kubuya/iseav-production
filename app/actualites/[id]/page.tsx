import ActualiteDetailContent from '@/components/pages/ActualiteDetailContent'

interface ActualiteDetailPageProps {
  params: {
    id: string
  }
}

export default function ActualiteDetailPage({ params }: ActualiteDetailPageProps) {
  return <ActualiteDetailContent id={params.id} />
}