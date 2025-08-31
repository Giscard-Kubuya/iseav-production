import { useState, useEffect } from 'react'
import axios from 'axios'

const CEPAC_WEBSITE_ID = 1 // Use website_id 1 for main CEPAC website

// Base URL for the shared API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

interface ApiResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
}

export function useCepacHeroSlides() {
  const [heroSlides, setHeroSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/hero-slides`, {
          params: { 
            website_id: CEPAC_WEBSITE_ID,
            active: true 
          }
        })
        
        if (response.data?.data) {
          setHeroSlides(response.data.data)
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching CEPAC hero slides:', err)
        setError('Failed to load hero slides')
        // Use fallback data
        setHeroSlides([])
      } finally {
        setLoading(false)
      }
    }

    fetchHeroSlides()
  }, [])

  return { heroSlides, loading, error }
}

export function useCepacServices(limit?: number) {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/services`, {
          params: { 
            website_id: CEPAC_WEBSITE_ID,
            active: true,
            ...(limit && { limit })
          }
        })
        
        if (response.data?.data) {
          setServices(response.data.data)
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching CEPAC services:', err)
        setError('Failed to load services')
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [limit])

  return { services, loading, error }
}

export function useCepacNews(limit?: number) {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/actualites`, {
          params: { 
            website_id: CEPAC_WEBSITE_ID,
            status: 'published',
            ...(limit && { limit })
          }
        })
        
        if (response.data?.data) {
          setNews(response.data.data)
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching CEPAC news:', err)
        setError('Failed to load news')
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [limit])

  return { news, loading, error }
}

export function useCepacTeam(limit?: number) {
  const [team, setTeam] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/team-experts`, {
          params: { 
            website_id: CEPAC_WEBSITE_ID,
            active: true,
            ...(limit && { limit })
          }
        })
        
        if (response.data?.data) {
          setTeam(response.data.data)
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching CEPAC team:', err)
        setError('Failed to load team')
        setTeam([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [limit])

  return { team, loading, error }
}

export function useCepacStats() {
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/company-statistics`, {
          params: { 
            website_id: CEPAC_WEBSITE_ID,
            active: true 
          }
        })
        
        if (response.data?.data) {
          setStats(response.data.data)
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching CEPAC stats:', err)
        setError('Failed to load statistics')
        setStats([])
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}