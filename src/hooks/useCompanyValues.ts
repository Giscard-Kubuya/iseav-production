'use client'

import { useState, useEffect } from 'react'
import { companyValuesApi } from '@/lib/api-services'
import { CompanyValue } from '@/lib/api'

export function useCompanyValues(limit?: number) {
  const [companyValues, setCompanyValues] = useState<CompanyValue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCompanyValues = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const params = {
          per_page: limit || 50,
          active: true
        }
        
        const response = await companyValuesApi.getAll(params)
        setCompanyValues(response.data.data || [])
      } catch (err) {
        console.error('Error fetching company values:', err)
        setError('Failed to load company values')
        setCompanyValues([])
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchCompanyValues()
  }, [limit])

  return {
    companyValues,
    loading,
    error,
    refetch: () => {
      setLoading(true)
      setError(null)
      return fetchCompanyValues()
    }
  }
}

export default useCompanyValues