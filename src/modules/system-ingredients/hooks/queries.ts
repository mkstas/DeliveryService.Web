import { useQuery } from '@tanstack/react-query';
import { httpOptional, Ingredient, queryKeys } from '@/common/api';

export const useIngredients = () => {
  return useQuery({
    queryKey: queryKeys.ingredients,
    queryFn: () => httpOptional<Ingredient[]>('ingredients'),
  });
};
