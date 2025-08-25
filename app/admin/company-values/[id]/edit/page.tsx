import CompanyValueEditor from '@/components/admin/CompanyValueEditor'

interface EditCompanyValuePageProps {
  params: Promise<{ id: string }>
}

export default async function EditCompanyValuePage({ params }: EditCompanyValuePageProps) {
  const { id } = await params
  return <CompanyValueEditor mode="edit" id={id} />
}