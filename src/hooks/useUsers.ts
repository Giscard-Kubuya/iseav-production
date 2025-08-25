'use client'

import { useCallback } from 'react'
import { siteUsersApi } from '@/lib/api-services'
import { usePaginatedApi, useApiMutation } from './useApi'
import { SiteUser } from '@/lib/api'

export function useUsers(initialParams = {}) {
  return usePaginatedApi(siteUsersApi.getAll, {
    page: 1,
    per_page: 15,
    ...initialParams
  })
}

export function useUserMutations() {
  const createMutation = useApiMutation<SiteUser, Partial<SiteUser>>()
  const updateMutation = useApiMutation<SiteUser, { id: number; data: Partial<SiteUser> }>()
  const deleteMutation = useApiMutation<void, number>()
  const updateStatusMutation = useApiMutation<SiteUser, { id: number; status: string }>()
  const updateRoleMutation = useApiMutation<SiteUser, { id: number; role: string }>()

  const createUser = useCallback(async (data: Partial<SiteUser>, options?: any) => {
    return createMutation.mutate(
      async (variables) => {
        const response = await siteUsersApi.create(variables);
        return { data: response.data.data };
      },
      data,
      options
    )
  }, [createMutation])

  const updateUser = useCallback(async (id: number, data: Partial<SiteUser>, options?: any) => {
    return updateMutation.mutate(
      async (variables) => {
        const response = await siteUsersApi.update(variables.id, variables.data);
        return { data: response.data.data };
      },
      { id, data },
      options
    )
  }, [updateMutation])

  const deleteUser = useCallback(async (id: number, options?: any) => {
    return deleteMutation.mutate(
      async (variables) => {
        const response = await siteUsersApi.delete(variables);
        return { data: response.data.data };
      },
      id,
      options
    )
  }, [deleteMutation])

  const updateUserStatus = useCallback(async (id: number, status: string, options?: any) => {
    return updateStatusMutation.mutate(
      async (variables) => {
        const response = await siteUsersApi.updateStatus(variables.id, variables.status);
        return { data: response.data.data };
      },
      { id, status },
      options
    )
  }, [updateStatusMutation])

  const updateUserRole = useCallback(async (id: number, role: string, options?: any) => {
    return updateRoleMutation.mutate(
      async (variables) => {
        const response = await siteUsersApi.updateRole(variables.id, variables.role);
        return { data: response.data.data };
      },
      { id, role },
      options
    )
  }, [updateRoleMutation])

  return {
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus,
    updateUserRole,
    loading: createMutation.loading || updateMutation.loading || deleteMutation.loading || 
             updateStatusMutation.loading || updateRoleMutation.loading,
    error: createMutation.error || updateMutation.error || deleteMutation.error || 
           updateStatusMutation.error || updateRoleMutation.error
  }
}