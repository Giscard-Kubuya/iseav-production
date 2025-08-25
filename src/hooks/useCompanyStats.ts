import { useState, useEffect } from 'react'
import { apiRequest, CompanyStatistic } from '@/lib/api'

export const useCompanyStats = () => {
  const [companyStats, setCompanyStats] = useState<CompanyStatistic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanyStats = async () => {
      try {
        setLoading(true)
        const response = await apiRequest.get('/company-statistics')
        setCompanyStats(response.data.data || [])
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch company statistics')
        console.error('Error fetching company statistics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyStats()
  }, [])

  return { companyStats, loading, error }
}