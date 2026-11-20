import { apiEndpoints, httpOptional, type PagedResult, queryKeys, type Specification } from '@/shared/api';
import { PAGE_SIZE } from '@/shared/config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useSpecifications = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.specifications, search ?? ''],
    queryFn: () => httpOptional<Specification[]>(apiEndpoints.specifications.all, { query: { search } }),
  });
};

export const usePagedSpecifications = (search: string | undefined, page: number) => {
  return useQuery<PagedResult<Specification> | null>({
    queryKey: [...queryKeys.specifications, 'paged', search ?? '', page],
    queryFn: () =>
      httpOptional<PagedResult<Specification>>(apiEndpoints.specifications.paged, {
        query: { search, page, pageSize: PAGE_SIZE },
      }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};
