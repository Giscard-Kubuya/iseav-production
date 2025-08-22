import ActualiteDetailContent from '@/components/pages/ActualiteDetailContent'

interface ActualiteDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ActualiteDetailPage({ params }: ActualiteDetailPageProps) {
  const { id } = await params
  return <ActualiteDetailContent id={id} />
}