'use client'

import { useState, useEffect } from 'react'
import { technologyPartnersApi } from '@/lib/api-services'
import { TechnologyPartner } from '@/lib/api'

export function useTechnologyPartners(limit?: number) {
  const [technologyPartners, setTechnologyPartners] = useState<TechnologyPartner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTechnologyPartners = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = {
        per_page: limit || 50,
        active: true
      }
      
      const response = await technologyPartnersApi.getAll(params)
      setTechnologyPartners(response.data.data || [])
    } catch (err) {
      console.error('Error fetching technology partners:', err)
      setError('Failed to load technology partners')
      setTechnologyPartners([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTechnologyPartners()
  }, [limit])

  return {
    technologyPartners,
    loading,
    error,
    refetch: () => {
      setLoading(true)
      setError(null)
      return fetchTechnologyPartners()
    }
  }
}

export default useTechnologyPartners