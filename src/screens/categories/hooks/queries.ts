import { apiEndpoints, type Category, httpOptional, type PagedResult, queryKeys } from '@/shared/api';
import { PAGE_SIZE } from '@/shared/config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useCategories = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.categories, search ?? ''],
    queryFn: () => httpOptional<Category[]>(apiEndpoints.categories.all, { query: { search } }),
  });
};

export const usePagedCategories = (search: string | undefined, page: number) => {
  return useQuery<PagedResult<Category> | null>({
    queryKey: [...queryKeys.categories, 'paged', search ?? '', page],
    queryFn: () =>
      httpOptional<PagedResult<Category>>(apiEndpoints.categories.paged, {
        query: { search, page, pageSize: PAGE_SIZE },
      }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};
