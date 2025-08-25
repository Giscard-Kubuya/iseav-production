'use client'

import { useCallback } from 'react'
import { portfolioProjectsApi } from '@/lib/api-services'
import { usePaginatedApi, useApiMutation } from './useApi'
import { PortfolioProject } from '@/lib/api'

export function usePortfolioProjects(initialParams = {}) {
  return usePaginatedApi(portfolioProjectsApi.getAll, {
    page: 1,
    per_page: 15,
    ...initialParams
  })
}

export function usePortfolioProjectMutations() {
  const createMutation = useApiMutation<PortfolioProject, Partial<PortfolioProject>>()
  const updateMutation = useApiMutation<PortfolioProject, { id: number; data: Partial<PortfolioProject> }>()
  const deleteMutation = useApiMutation<void, number>()
  const toggleFeaturedMutation = useApiMutation<PortfolioProject, number>()

  const createProject = useCallback(async (data: Partial<PortfolioProject>, options?: any) => {
    return createMutation.mutate(
      async (variables) => {
        const response = await portfolioProjectsApi.create(variables);
        return { data: response.data.data };
      },
      data,
      options
    )
  }, [createMutation])

  const updateProject = useCallback(async (id: number, data: Partial<PortfolioProject>, options?: any) => {
    return updateMutation.mutate(
      async (variables) => {
        const response = await portfolioProjectsApi.update(variables.id, variables.data);
        return { data: response.data.data };
      },
      { id, data },
      options
    )
  }, [updateMutation])

  const deleteProject = useCallback(async (id: number, options?: any) => {
    return deleteMutation.mutate(
      async (variables) => {
        const response = await portfolioProjectsApi.delete(variables);
        return { data: response.data.data };
      },
      id,
      options
    )
  }, [deleteMutation])

  const toggleFeatured = useCallback(async (id: number, options?: any) => {
    return toggleFeaturedMutation.mutate(
      async (variables) => {
        const response = await portfolioProjectsApi.toggleFeatured(variables);
        return { data: response.data.data };
      },
      id,
      options
    )
  }, [toggleFeaturedMutation])

  return {
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    loading: createMutation.loading || updateMutation.loading || deleteMutation.loading || 
             toggleFeaturedMutation.loading,
    error: createMutation.error || updateMutation.error || deleteMutation.error || 
           toggleFeaturedMutation.error
  }
}