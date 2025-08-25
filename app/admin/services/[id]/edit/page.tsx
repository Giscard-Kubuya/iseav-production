import ServiceEditor from '@/components/admin/ServiceEditor'

interface EditServicePageProps {
  params: Promise<{ id: string }>
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params
  return <ServiceEditor mode="edit" id={id} />
}