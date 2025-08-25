import { useState, useEffect } from 'react'
import { apiRequest, Actualite } from '@/lib/api'

export const useLatestNews = (limit: number = 3) => {
  const [news, setNews] = useState<Actualite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true)
        const response = await apiRequest.get(`/actualites?limit=${limit}&status=published`)
        setNews(response.data.data || [])
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch latest news')
        console.error('Error fetching latest news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestNews()
  }, [limit])

  return { news, loading, error }
}