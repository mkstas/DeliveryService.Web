import { useQuery } from '@tanstack/react-query';
import { apiEndpoints, type Dish, httpOptional, queryKeys } from '@/common/api';

export const useDishes = () => {
  return useQuery({
    queryKey: queryKeys.dishes,
    queryFn: () => httpOptional<Dish[]>(apiEndpoints.dishes.all),
  });
};
