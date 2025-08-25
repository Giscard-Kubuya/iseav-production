import TeamExpertEditor from '@/components/admin/TeamExpertEditor'

interface EditTeamExpertPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTeamExpertPage({ params }: EditTeamExpertPageProps) {
  const { id } = await params
  return <TeamExpertEditor mode="edit" id={id} />
}