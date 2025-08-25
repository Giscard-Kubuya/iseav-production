'use client'

import { useState, useEffect } from 'react'
import { leadershipApi } from '@/lib/api-services'
import { Leadership } from '@/lib/api'

export function useLeadership(limit?: number) {
  const [leadership, setLeadership] = useState<Leadership[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeadership = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = {
        per_page: limit || 50,
        active: true
      }
      
      const response = await leadershipApi.getAll(params)
      setLeadership(response.data.data || [])
    } catch (err) {
      console.error('Error fetching leadership:', err)
      setError('Failed to load leadership')
      setLeadership([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeadership()
  }, [limit])

  return {
    leadership,
    loading,
    error,
    refetch: () => {
      setLoading(true)
      setError(null)
      return fetchLeadership()
    }
  }
}

export default useLeadership