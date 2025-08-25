import LeadershipEditor from '@/components/admin/LeadershipEditor'

interface EditLeadershipPageProps {
  params: Promise<{ id: string }>
}

export default async function EditLeadershipPage({ params }: EditLeadershipPageProps) {
  const { id } = await params
  return <LeadershipEditor mode="edit" id={id} />
}