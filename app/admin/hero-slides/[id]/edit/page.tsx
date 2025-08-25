import HeroSlideEditor from '@/components/admin/HeroSlideEditor'

interface EditHeroSlidePageProps {
  params: Promise<{ id: string }>
}

export default async function EditHeroSlidePage({ params }: EditHeroSlidePageProps) {
  const { id } = await params
  return <HeroSlideEditor mode="edit" id={id} />
}