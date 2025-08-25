import LocationEditor from '@/components/admin/LocationEditor'

interface EditLocationPageProps {
  params: Promise<{ id: string }>
}

export default async function EditLocationPage({ params }: EditLocationPageProps) {
  const { id } = await params
  return <LocationEditor mode="edit" id={id} />
}