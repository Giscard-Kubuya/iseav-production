import TestimonialEditor from '@/components/admin/TestimonialEditor'

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = await params
  return <TestimonialEditor mode="edit" id={id} />
}