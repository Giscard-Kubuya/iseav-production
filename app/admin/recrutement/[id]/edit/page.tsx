import JobEditor from '@/components/admin/JobEditor'

interface EditJobPageProps {
  params: Promise<{ id: string }>
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params
  return <JobEditor mode="edit" id={id} />
}