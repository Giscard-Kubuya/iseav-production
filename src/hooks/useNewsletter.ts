"use client";

import { useCallback } from "react";
import { newsletterApi } from "@/lib/api-services";
import { usePaginatedApi, useApiMutation, useApiData } from "./useApi";
import { NewsletterSubscription } from "@/lib/api";

export function useNewsletterSubscriptions(initialParams = {}) {
  return usePaginatedApi(newsletterApi.getAll, {
    page: 1,
    per_page: 15,
    ...initialParams,
  });
}

export function useNewsletterStats() {
  return useApiData(() => newsletterApi.getStats());
}

export function useNewsletterMutations() {
  const createMutation = useApiMutation<NewsletterSubscription, Partial<NewsletterSubscription>>();
  const updateMutation = useApiMutation<
    NewsletterSubscription,
    { id: number; data: Partial<NewsletterSubscription> }
  >();
  const deleteMutation = useApiMutation<void, number>();
  const toggleStatusMutation = useApiMutation<NewsletterSubscription, number>();
  const bulkActionMutation = useApiMutation<void, { ids: number[], action: string }>();

  const createSubscription = useCallback(
    async (data: Partial<NewsletterSubscription>, options?: any) => {
      return createMutation.mutate(
        async (variables) => {
          const response = await newsletterApi.create(variables);
          return { data: response.data.data };
        },
        data,
        options
      );
    },
    [createMutation]
  );

  const updateSubscription = useCallback(
    async (id: number, data: Partial<NewsletterSubscription>, options?: any) => {
      return updateMutation.mutate(
        async (variables) => {
          const response = await newsletterApi.update(variables.id, variables.data);
          return { data: response.data.data };
        },
        { id, data },
        options
      );
    },
    [updateMutation]
  );

  const deleteSubscription = useCallback(
    async (id: number, options?: any) => {
      return deleteMutation.mutate(
        async (variables) => {
          const response = await newsletterApi.delete(variables);
          return { data: response.data.data };
        },
        id,
        options
      );
    },
    [deleteMutation]
  );

  const toggleStatus = useCallback(
    async (id: number, options?: any) => {
      return toggleStatusMutation.mutate(
        async (variables) => {
          const response = await newsletterApi.toggleStatus(variables);
          return { data: response.data.data };
        },
        id,
        options
      );
    },
    [toggleStatusMutation]
  );

  const bulkAction = useCallback(
    async (ids: number[], action: string, options?: any) => {
      return bulkActionMutation.mutate(
        async (variables) => {
          const response = await newsletterApi.bulkAction(variables);
          return { data: response.data.data };
        },
        { ids, action },
        options
      );
    },
    [bulkActionMutation]
  );

  return {
    createSubscription,
    updateSubscription,
    deleteSubscription,
    toggleStatus,
    bulkAction,
    loading:
      createMutation.loading ||
      updateMutation.loading ||
      deleteMutation.loading ||
      toggleStatusMutation.loading ||
      bulkActionMutation.loading,
    error:
      createMutation.error ||
      updateMutation.error ||
      deleteMutation.error ||
      toggleStatusMutation.error ||
      bulkActionMutation.error,
  };
}