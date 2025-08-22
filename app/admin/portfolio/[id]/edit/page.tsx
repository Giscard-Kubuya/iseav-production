import PortfolioEditor from '@/components/admin/PortfolioEditor'

interface EditPortfolioPageProps {
  params: { id: string }
}

export default function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  return <PortfolioEditor mode="edit" id={params.id} />
}