import CompanyJourneyEditor from '@/components/admin/CompanyJourneyEditor'

interface EditCompanyJourneyPageProps {
  params: Promise<{ id: string }>
}

export default async function EditCompanyJourneyPage({ params }: EditCompanyJourneyPageProps) {
  const { id } = await params
  return <CompanyJourneyEditor mode="edit" id={id} />
}