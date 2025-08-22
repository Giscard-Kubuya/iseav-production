import BlogEditor from '@/components/admin/BlogEditor'

interface EditBlogPageProps {
  params: {
    id: string
  }
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  return <BlogEditor mode="edit" id={params.id} />
}