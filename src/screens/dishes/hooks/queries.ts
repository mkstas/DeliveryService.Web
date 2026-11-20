import { apiEndpoints, type Dish, httpOptional, type PagedResult, queryKeys } from '@/shared/api';
import { PAGE_SIZE } from '@/shared/config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useDishes = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.dishes, search ?? ''],
    queryFn: () => httpOptional<Dish[]>(apiEndpoints.dishes.all, { query: { search } }),
  });
};

export const usePagedDishes = (search: string | undefined, page: number) => {
  return useQuery<PagedResult<Dish> | null>({
    queryKey: [...queryKeys.dishes, 'paged', search ?? '', page],
    queryFn: () =>
      httpOptional<PagedResult<Dish>>(apiEndpoints.dishes.paged, {
        query: { search, page, pageSize: PAGE_SIZE },
      }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};
