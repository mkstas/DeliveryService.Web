import { apiEndpoints, httpOptional, queryKeys, type Restaurant } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export const useRestaurants = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.restaurants, search ?? ''],
    queryFn: () => httpOptional<Restaurant[]>(apiEndpoints.restaurants.all, { query: { search } }),
  });
};
