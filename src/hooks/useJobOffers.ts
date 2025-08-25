'use client'

import { useCallback } from 'react'
import { jobOffersApi } from '@/lib/api-services'
import { usePaginatedApi, useApiMutation } from './useApi'
import { JobOffer } from '@/lib/api'

export function useJobOffers(initialParams = {}) {
  return usePaginatedApi(jobOffersApi.getAll, {
    page: 1,
    per_page: 15,
    ...initialParams
  })
}

export function useJobOfferMutations() {
  const createMutation = useApiMutation<JobOffer, Partial<JobOffer>>()
  const updateMutation = useApiMutation<JobOffer, { id: number; data: Partial<JobOffer> }>()
  const deleteMutation = useApiMutation<void, number>()
  const toggleFeaturedMutation = useApiMutation<JobOffer, number>()
  const toggleUrgentMutation = useApiMutation<JobOffer, number>()
  const updateStatusMutation = useApiMutation<JobOffer, { id: number; status: string }>()

  const createJob = useCallback(async (data: Partial<JobOffer>, options?: any) => {
    return createMutation.mutate(
      async (variables) => {
        const response = await jobOffersApi.create(variables);
        return { data: response.data.data };
      },
      data,
      options
    )
  }, [createMutation])

  const updateJob = useCallback(async (id: number, data: Partial<JobOffer>, options?: any) => {
    return updateMutation.mutate(
      async (variables) => {
        const response = await jobOffersApi.update(variables.id, variables.data);
        return { data: response.data.data };
      },
      { id, data },
      options
    )
  }, [updateMutation])

  const deleteJob = useCallback(async (id: number, options?: any) => {
    return deleteMutation.mutate(
      async (variables) => {
        const response = await jobOffersApi.delete(variables);
        return { data: response.data.data };
      },
      id,
      options
    )
  }, [deleteMutation])

  const toggleFeatured = useCallback(async (id: number, options?: any) => {
    return toggleFeaturedMutation.mutate(
      async (variables) => {
        const response = await jobOffersApi.toggleFeatured(variables);
        return { data: response.data.data };
      },
      id,
      options
    )
  }, [toggleFeaturedMutation])

  const toggleUrgent = useCallback(async (id: number, options?: any) => {
    return toggleUrgentMutation.mutate(
      async (variables) => {
        const response = await jobOffersApi.toggleUrgent(variables);
        return { data: response.data.data };
      },
      id,
      options
    )
  }, [toggleUrgentMutation])

  const updateStatus = useCallback(async (id: number, status: string, options?: any) => {
    return updateStatusMutation.mutate(
      async (variables) => {
        const response = await jobOffersApi.updateStatus(variables.id, variables.status);
        return { data: response.data.data };
      },
      { id, status },
      options
    )
  }, [updateStatusMutation])

  return {
    createJob,
    updateJob,
    deleteJob,
    toggleFeatured,
    toggleUrgent,
    updateStatus,
    loading: createMutation.loading || updateMutation.loading || deleteMutation.loading || 
             toggleFeaturedMutation.loading || toggleUrgentMutation.loading || updateStatusMutation.loading,
    error: createMutation.error || updateMutation.error || deleteMutation.error || 
           toggleFeaturedMutation.error || toggleUrgentMutation.error || updateStatusMutation.error
  }
}