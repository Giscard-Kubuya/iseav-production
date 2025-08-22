import BlogEditor from '@/components/admin/BlogEditor'

interface EditBlogPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params
  return <BlogEditor mode="edit" id={id} />
}