'use client'

import { useCallback } from 'react'
import { galleryItemsApi } from '@/lib/api-services'
import { usePaginatedApi, useApiMutation } from './useApi'
import { GalleryItem } from '@/lib/api'

export function useGalleryItems(initialParams = {}) {
  return usePaginatedApi(galleryItemsApi.getAll, {
    page: 1,
    per_page: 15,
    ...initialParams
  })
}

export function useGalleryItemMutations() {
  const createMutation = useApiMutation<GalleryItem, Partial<GalleryItem>>()
  const updateMutation = useApiMutation<GalleryItem, { id: number; data: Partial<GalleryItem> }>()
  const deleteMutation = useApiMutation<void, number>()
  const toggleFeaturedMutation = useApiMutation<GalleryItem, number>()
  const togglePublishedMutation = useApiMutation<GalleryItem, number>()

  const createItem = useCallback(async (data: Partial<GalleryItem>, options?: any) => {
    return createMutation.mutate(
      async (variables) => {
        const response = await galleryItemsApi.create(variables);
        return { data: response.data.data };
      },
      data,
      options
    )
  }, [createMutation])

  const updateItem = useCallback(async (id: number, data: Partial<GalleryItem>, options?: any) => {
    return updateMutation.mutate(
      async (variables) => {
        const response = await galleryItemsApi.update(variables.id, variables.data);
        return { data: response.data.data };
      },
      { id, data },
      options
    )
  }, [updateMutation])

  const deleteItem = useCallback(async (id: number, options?: any) => {
    return deleteMutation.mutate(
      async (variables) => {
        const response = await galleryItemsApi.delete(variables);
        return { data: response.data.data };
      },
      id,
      options
    )
  }, [deleteMutation])

  const toggleFeatured = useCallback(async (id: number, options?: any) => {
    return toggleFeaturedMutation.mutate(
      async (variables) => {
        const response = await galleryItemsApi.toggleFeatured(variables);
        return { data: response.data.data };
      },
      id,
      options
    )
  }, [toggleFeaturedMutation])

  const togglePublished = useCallback(async (id: number, options?: any) => {
    return togglePublishedMutation.mutate(
      async (variables) => {
        const response = await galleryItemsApi.togglePublished(variables);
        return { data: response.data.data };
      },
      id,
      options
    )
  }, [togglePublishedMutation])

  return {
    createItem,
    updateItem,
    deleteItem,
    toggleFeatured,
    togglePublished,
    loading: createMutation.loading || updateMutation.loading || deleteMutation.loading || 
             toggleFeaturedMutation.loading || togglePublishedMutation.loading,
    error: createMutation.error || updateMutation.error || deleteMutation.error || 
           toggleFeaturedMutation.error || togglePublishedMutation.error
  }
}