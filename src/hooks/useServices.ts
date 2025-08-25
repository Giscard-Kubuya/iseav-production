"use client";

import { useCallback } from "react";
import { servicesApi } from "@/lib/api-services";
import { usePaginatedApi, useApiMutation } from "./useApi";
import { Service } from "@/lib/api";

export function useServices(initialParams = {}) {
  return usePaginatedApi(servicesApi.getAll, {
    page: 1,
    per_page: 15,
    ...initialParams,
  });
}

export function useServiceMutations() {
  const createMutation = useApiMutation<Service, Partial<Service>>();
  const updateMutation = useApiMutation<
    Service,
    { id: number; data: Partial<Service> }
  >();
  const deleteMutation = useApiMutation<void, number>();
  const toggleActiveMutation = useApiMutation<Service, number>();
  const toggleFeaturedMutation = useApiMutation<Service, number>();

  const createService = useCallback(
    async (data: Partial<Service>, options?: any) => {
      return createMutation.mutate(
        async (variables) => {
          const response = await servicesApi.create(variables);
          return { data: response.data.data };
        },
        data,
        options
      );
    },
    [createMutation]
  );

  const updateService = useCallback(
    async (id: number, data: Partial<Service>, options?: any) => {
      return updateMutation.mutate(
        async (variables) => {
          const response = await servicesApi.update(variables.id, variables.data);
          return { data: response.data.data };
        },
        { id, data },
        options
      );
    },
    [updateMutation]
  );

  const deleteService = useCallback(
    async (id: number, options?: any) => {
      return deleteMutation.mutate(
        async (variables) => {
          const response = await servicesApi.delete(variables);
          return { data: response.data.data };
        },
        id,
        options
      );
    },
    [deleteMutation]
  );

  const toggleActive = useCallback(
    async (id: number, options?: any) => {
      return toggleActiveMutation.mutate(
        async (variables) => {
          const response = await servicesApi.toggleActive(variables);
          return { data: response.data.data };
        },
        id,
        options
      );
    },
    [toggleActiveMutation]
  );

  const toggleFeatured = useCallback(
    async (id: number, options?: any) => {
      return toggleFeaturedMutation.mutate(
        async (variables) => {
          const response = await servicesApi.toggleFeatured(variables);
          return { data: response.data.data };
        },
        id,
        options
      );
    },
    [toggleFeaturedMutation]
  );

  return {
    createService,
    updateService,
    deleteService,
    toggleActive,
    toggleFeatured,
    loading:
      createMutation.loading ||
      updateMutation.loading ||
      deleteMutation.loading ||
      toggleActiveMutation.loading ||
      toggleFeaturedMutation.loading,
    error:
      createMutation.error ||
      updateMutation.error ||
      deleteMutation.error ||
      toggleActiveMutation.error ||
      toggleFeaturedMutation.error,
  };
}
