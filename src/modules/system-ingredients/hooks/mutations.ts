import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { CreateIngredientData, UpdateIngredientData } from '../types';

export const useCreateIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIngredientData) => http<void>('ingredients', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ingredients });
    },
  });
};

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateIngredientData }) =>
      http<void>(`ingredients/${id}`, { method: 'PUT', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ingredients });
    },
  });
};
