import { apiEndpoints, httpOptional, type PagedResult, queryKeys, type Restaurant } from '@/shared/api';
import { PAGE_SIZE } from '@/shared/config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useRestaurants = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.restaurants, search ?? ''],
    queryFn: () => httpOptional<Restaurant[]>(apiEndpoints.restaurants.all, { query: { search } }),
  });
};

export const usePagedRestaurants = (search: string | undefined, page: number) => {
  return useQuery<PagedResult<Restaurant> | null>({
    queryKey: [...queryKeys.restaurants, 'paged', search ?? '', page],
    queryFn: () =>
      httpOptional<PagedResult<Restaurant>>(apiEndpoints.restaurants.paged, {
        query: { search, page, pageSize: PAGE_SIZE },
      }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};
