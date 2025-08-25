"use client";

import { useCallback } from "react";
import { actualitesApi } from "@/lib/api-services";
import { usePaginatedApi, useApiMutation } from "./useApi";
import { Actualite } from "@/lib/api";

export function useActualites(initialParams = {}) {
  return usePaginatedApi(actualitesApi.getAll, {
    page: 1,
    per_page: 15,
    ...initialParams,
  });
}

export function useActualiteMutations() {
  const createMutation = useApiMutation<Actualite, Partial<Actualite>>();
  const updateMutation = useApiMutation<
    Actualite,
    { id: number; data: Partial<Actualite> }
  >();
  const deleteMutation = useApiMutation<void, number>();
  const toggleFeaturedMutation = useApiMutation<Actualite, number>();
  const toggleUrgentMutation = useApiMutation<Actualite, number>();

  const createActualite = useCallback(
    async (data: Partial<Actualite>, options?: any) => {
      return createMutation.mutate(
        async (variables) => {
          const response = await actualitesApi.create(variables);
          return { data: response.data.data };
        },
        data,
        options
      );
    },
    [createMutation]
  );

  const updateActualite = useCallback(
    async (id: number, data: Partial<Actualite>, options?: any) => {
      return updateMutation.mutate(
        async (variables) => {
          const response = await actualitesApi.update(variables.id, variables.data);
          return { data: response.data.data };
        },
        { id, data },
        options
      );
    },
    [updateMutation]
  );

  const deleteActualite = useCallback(
    async (id: number, options?: any) => {
      return deleteMutation.mutate(
        async (variables) => {
          const response = await actualitesApi.delete(variables);
          return { data: response.data.data };
        },
        id,
        options
      );
    },
    [deleteMutation]
  );

  const toggleFeatured = useCallback(
    async (id: number, options?: any) => {
      return toggleFeaturedMutation.mutate(
        async (variables) => {
          const response = await actualitesApi.toggleFeatured(variables);
          return { data: response.data.data };
        },
        id,
        options
      );
    },
    [toggleFeaturedMutation]
  );

  const toggleUrgent = useCallback(
    async (id: number, options?: any) => {
      return toggleUrgentMutation.mutate(
        async (variables) => {
          const response = await actualitesApi.toggleUrgent(variables);
          return { data: response.data.data };
        },
        id,
        options
      );
    },
    [toggleUrgentMutation]
  );

  return {
    createActualite,
    updateActualite,
    deleteActualite,
    toggleFeatured,
    toggleUrgent,
    loading:
      createMutation.loading ||
      updateMutation.loading ||
      deleteMutation.loading ||
      toggleFeaturedMutation.loading ||
      toggleUrgentMutation.loading,
    error:
      createMutation.error ||
      updateMutation.error ||
      deleteMutation.error ||
      toggleFeaturedMutation.error ||
      toggleUrgentMutation.error,
  };
}
