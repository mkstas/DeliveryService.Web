import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEndpoints, http, queryKeys } from '@/common/api';
import { CreateCategoryData, UpdateCategoryData } from '../types';

type UpdateCategoryVariables = UpdateCategoryData & {
  id: string;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryData) => http<void>(apiEndpoints.categories.all, { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: UpdateCategoryVariables) =>
      http<void>(apiEndpoints.categories.byId(id), { method: 'PUT', body: { name } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => http<void>(apiEndpoints.categories.byId(id), { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.dishes });
    },
  });
};
