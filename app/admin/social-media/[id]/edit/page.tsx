import SocialMediaEditor from '@/components/admin/SocialMediaEditor'

interface EditSocialMediaPageProps {
  params: Promise<{ id: string }>
}

export default async function EditSocialMediaPage({ params }: EditSocialMediaPageProps) {
  const { id } = await params
  return <SocialMediaEditor mode="edit" id={id} />
}