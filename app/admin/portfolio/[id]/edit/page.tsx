import PortfolioEditor from '@/components/admin/PortfolioEditor'

interface EditPortfolioPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const { id } = await params
  return <PortfolioEditor mode="edit" id={id} />
}