import { useQuery } from '@tanstack/react-query';
import { apiEndpoints, httpOptional, queryKeys, type Restaurant } from '@/common/api';

export const useRestaurants = () => {
  return useQuery({
    queryKey: queryKeys.restaurants,
    queryFn: () => httpOptional<Restaurant[]>(apiEndpoints.restaurants.all),
  });
};
