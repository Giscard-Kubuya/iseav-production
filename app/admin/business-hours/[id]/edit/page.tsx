import BusinessHoursEditor from '@/components/admin/BusinessHoursEditor'

interface EditBusinessHoursPageProps {
  params: Promise<{ id: string }>
}

export default async function EditBusinessHoursPage({ params }: EditBusinessHoursPageProps) {
  const { id } = await params
  return <BusinessHoursEditor mode="edit" id={id} />
}