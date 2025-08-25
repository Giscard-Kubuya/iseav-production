import ContactInfoEditor from '@/components/admin/ContactInfoEditor'

interface EditContactInfoPageProps {
  params: Promise<{ id: string }>
}

export default async function EditContactInfoPage({ params }: EditContactInfoPageProps) {
  const { id } = await params
  return <ContactInfoEditor mode="edit" id={id} />
}