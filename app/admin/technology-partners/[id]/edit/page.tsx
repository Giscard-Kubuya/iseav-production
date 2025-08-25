import TechnologyPartnerEditor from '@/components/admin/TechnologyPartnerEditor'

interface EditTechnologyPartnerPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTechnologyPartnerPage({ params }: EditTechnologyPartnerPageProps) {
  const { id } = await params
  return <TechnologyPartnerEditor mode="edit" id={id} />
}