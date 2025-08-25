import CompanyStatisticEditor from '@/components/admin/CompanyStatisticEditor'

interface EditCompanyStatisticPageProps {
  params: Promise<{ id: string }>
}

export default async function EditCompanyStatisticPage({ params }: EditCompanyStatisticPageProps) {
  const { id } = await params
  return <CompanyStatisticEditor mode="edit" id={id} />
}