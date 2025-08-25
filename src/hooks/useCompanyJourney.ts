'use client'

import { useState, useEffect } from 'react'
import { companyJourneyApi } from '@/lib/api-services'
import { CompanyJourney } from '@/lib/api'

export function useCompanyJourney(limit?: number) {
  const [companyJourney, setCompanyJourney] = useState<CompanyJourney[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCompanyJourney = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const params = {
          per_page: limit || 50,
          active: true
        }
        
        const response = await companyJourneyApi.getAll(params)
        setCompanyJourney(response.data.data || [])
      } catch (err) {
        console.error('Error fetching company journey:', err)
        setError('Failed to load company journey')
        setCompanyJourney([])
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchCompanyJourney()
  }, [limit])

  return {
    companyJourney,
    loading,
    error,
    refetch: () => {
      setLoading(true)
      setError(null)
      return fetchCompanyJourney()
    }
  }
}

export default useCompanyJourney