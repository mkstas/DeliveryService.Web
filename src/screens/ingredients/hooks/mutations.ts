import { apiEndpoints, http, queryKeys } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateIngredientData, UpdateIngredientData } from '../types';

const useInvalidateIngredients = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ['ingredients'] });
    queryClient.invalidateQueries({ queryKey: queryKeys.restaurants });
  };
};

export const useCreateIngredient = () => {
  const invalidate = useInvalidateIngredients();

  return useMutation({
    mutationFn: (data: CreateIngredientData) =>
      http<void>(apiEndpoints.restaurants.ingredients, { method: 'POST', body: data }),
    onSuccess: invalidate,
  });
};

export const useUpdateIngredient = () => {
  const invalidate = useInvalidateIngredients();

  return useMutation({
    mutationFn: ({
      restaurantId,
      ingredientId,
      data,
    }: {
      restaurantId: string;
      ingredientId: string;
      data: UpdateIngredientData;
    }) => http<void>(apiEndpoints.restaurants.ingredient(restaurantId, ingredientId), { method: 'PUT', body: data }),
    onSuccess: invalidate,
  });
};

export const useDeleteIngredient = () => {
  const invalidate = useInvalidateIngredients();

  return useMutation({
    mutationFn: ({ restaurantId, ingredientId }: { restaurantId: string; ingredientId: string }) =>
      http<void>(apiEndpoints.restaurants.ingredient(restaurantId, ingredientId), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};
