"use client";

import { useCallback } from "react";
import { blogPostsApi } from "@/lib/api-services";
import { usePaginatedApi, useApiMutation } from "./useApi";
import { BlogPost } from "@/lib/api";

export function useBlogPosts(initialParams = {}) {
  return usePaginatedApi(blogPostsApi.getAll, {
    page: 1,
    per_page: 15,
    ...initialParams,
  });
}

export function useBlogPostMutations() {
  const createMutation = useApiMutation<BlogPost, Partial<BlogPost>>();
  const updateMutation = useApiMutation<
    BlogPost,
    { id: number; data: Partial<BlogPost> }
  >();
  const deleteMutation = useApiMutation<void, number>();
  const toggleFeaturedMutation = useApiMutation<BlogPost, number>();
  const updateStatusMutation = useApiMutation<
    BlogPost,
    { id: number; status: string }
  >();

  const createPost = useCallback(
    async (data: Partial<BlogPost>, options?: any) => {
      return createMutation.mutate(
        async (variables) => {
          const response = await blogPostsApi.create(variables);
          return { data: response.data.data };
        },
        data,
        options
      );
    },
    [createMutation]
  );

  const updatePost = useCallback(
    async (id: number, data: Partial<BlogPost>, options?: any) => {
      return updateMutation.mutate(
        async (variables) => {
          const response = await blogPostsApi.update(variables.id, variables.data);
          return { data: response.data.data };
        },
        { id, data },
        options
      );
    },
    [updateMutation]
  );

  const deletePost = useCallback(
    async (id: number, options?: any) => {
      return deleteMutation.mutate(
        async (variables) => {
          const response = await blogPostsApi.delete(variables);
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
          const response = await blogPostsApi.toggleFeatured(variables);
          return { data: response.data.data };
        },
        id,
        options
      );
    },
    [toggleFeaturedMutation]
  );

  const updateStatus = useCallback(
    async (id: number, status: string, options?: any) => {
      return updateStatusMutation.mutate(
        async (variables) => {
          const response = await blogPostsApi.updateStatus(variables.id, variables.status);
          return { data: response.data.data };
        },
        { id, status },
        options
      );
    },
    [updateStatusMutation]
  );

  return {
    createPost,
    updatePost,
    deletePost,
    toggleFeatured,
    updateStatus,
    loading:
      createMutation.loading ||
      updateMutation.loading ||
      deleteMutation.loading ||
      toggleFeaturedMutation.loading ||
      updateStatusMutation.loading,
    error:
      createMutation.error ||
      updateMutation.error ||
      deleteMutation.error ||
      toggleFeaturedMutation.error ||
      updateStatusMutation.error,
  };
}
