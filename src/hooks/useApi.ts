'use client'

import { useState, useEffect, useCallback } from 'react'
import { AxiosError, AxiosResponse } from 'axios'

// Generic API hook for managing loading states and error handling
export function useApiData<T>(
  apiCall: () => Promise<{ data: T }> | Promise<AxiosResponse<T>> | null | string | false | undefined,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = apiCall()
      
      // Skip if the condition is false/null/empty string/undefined
      if (!result || result === "" || result === null || result === undefined) {
        setLoading(false)
        return
      }
      
      const response = await result
      
      // Handle AxiosResponse format (has .data property)
      if (response && typeof response === 'object' && 'data' in response) {
        setData(response.data)
      } else {
        // Handle direct data format
        setData(response as T)
      }
    } catch (err: any) {
      const axiosError = err as AxiosError
      setError((axiosError.response?.data as any)?.message || (axiosError as any)?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}

// Hook for API mutations (create, update, delete operations)
export function useApiMutation<TData = any, TVariables = any>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<TData | null>(null)

  const mutate = useCallback(async (
    apiCall: (variables: TVariables) => Promise<{ data: TData }> | Promise<AxiosResponse<TData>>,
    variables: TVariables,
    options?: {
      onSuccess?: (data: TData) => void
      onError?: (error: string) => void
    }
  ) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall(variables)
      
      // Handle AxiosResponse format (has .data property)
      const data = response && typeof response === 'object' && 'data' in response 
        ? response.data 
        : response as TData
        
      setData(data)
      options?.onSuccess?.(data)
      return data
    } catch (err: any) {
      const axiosError = err as AxiosError
      const errorMessage = (axiosError.response?.data as any)?.message || (axiosError as any)?.message || 'An error occurred'
      setError(errorMessage)
      options?.onError?.(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setData(null)
  }, [])

  return { mutate, loading, error, data, reset }
}

// Paginated data hook
export function usePaginatedApi<T>(
  apiCall: (params: any) => Promise<{ data: { data: T[]; meta: any } }> | Promise<AxiosResponse<{ data: T[]; meta: any }>>,
  initialParams: any = {}
) {
  const [data, setData] = useState<T[]>([])
  const [meta, setMeta] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [params, setParams] = useState(initialParams)

  const fetchData = useCallback(async (newParams = params) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall(newParams)
      
      // Handle AxiosResponse format (has .data property)
      const responseData = response && typeof response === 'object' && 'data' in response 
        ? response.data 
        : response
        
      setData(responseData.data)
      setMeta(responseData.meta)
    } catch (err: any) {
      const axiosError = err as AxiosError
      setError((axiosError.response?.data as any)?.message || (axiosError as any)?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const updateParams = useCallback((newParams: any) => {
    setParams((prevParams: any) => {
      const updatedParams = { ...prevParams, ...newParams }
      // Call API directly to avoid circular dependency
      apiCall(updatedParams).then(response => {
        // Handle AxiosResponse format (has .data property)
        const responseData = response && typeof response === 'object' && 'data' in response 
          ? response.data 
          : response
          
        setData(responseData.data)
        setMeta(responseData.meta)
        setLoading(false)
        setError(null)
      }).catch((err: any) => {
        const axiosError = err as AxiosError
        setError((axiosError.response?.data as any)?.message || (axiosError as any)?.message || 'An error occurred')
        setLoading(false)
      })
      return updatedParams
    })
    setLoading(true)
    setError(null)
  }, [apiCall])

  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)
    apiCall(params).then(response => {
      // Handle AxiosResponse format (has .data property)
      const responseData = response && typeof response === 'object' && 'data' in response 
        ? response.data 
        : response
        
      setData(responseData.data)
      setMeta(responseData.meta)
      setLoading(false)
    }).catch((err: any) => {
      const axiosError = err as AxiosError
      setError((axiosError.response?.data as any)?.message || (axiosError as any)?.message || 'An error occurred')
      setLoading(false)
    })
  }, [apiCall, params])

  return { 
    data, 
    meta, 
    loading, 
    error, 
    params, 
    updateParams, 
    refetch 
  }
}

// Local storage hook for persisting data
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      }
      return initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}

// Debounced value hook for search inputs
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}