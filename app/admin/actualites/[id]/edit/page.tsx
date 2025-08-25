import ActualiteEditor from '@/components/admin/ActualiteEditor'

interface EditActualitePageProps {
  params: Promise<{ id: string }>
}

export default async function EditActualitePage({ params }: EditActualitePageProps) {
  const { id } = await params
  return <ActualiteEditor mode="edit" id={id} />
}