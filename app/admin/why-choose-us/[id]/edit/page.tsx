import WhyChooseUsEditor from '@/components/admin/WhyChooseUsEditor'

interface EditWhyChooseUsPageProps {
  params: Promise<{ id: string }>
}

export default async function EditWhyChooseUsPage({ params }: EditWhyChooseUsPageProps) {
  const { id } = await params
  return <WhyChooseUsEditor mode="edit" id={id} />
}