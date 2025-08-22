import BlogDetailContent from '@/components/pages/BlogDetailContent'

interface BlogDetailPageProps {
  params: {
    id: string
  }
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return <BlogDetailContent id={params.id} />
}