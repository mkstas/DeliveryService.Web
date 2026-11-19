import { apiEndpoints, type Dish, httpOptional, queryKeys } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export const useDishes = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.dishes, search ?? ''],
    queryFn: () => httpOptional<Dish[]>(apiEndpoints.dishes.all, { query: { search } }),
  });
};
