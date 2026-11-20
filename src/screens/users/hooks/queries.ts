import { apiEndpoints, httpOptional, type PagedResult, queryKeys, type User } from '@/shared/api';
import { PAGE_SIZE } from '@/shared/config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useUsers = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.user.all, search ?? ''],
    queryFn: () => httpOptional<User[]>(apiEndpoints.users.all, { query: { search } }),
  });
};

export const usePagedUsers = (search: string | undefined, page: number) => {
  return useQuery<PagedResult<User> | null>({
    queryKey: [...queryKeys.user.all, 'paged', search ?? '', page],
    queryFn: () =>
      httpOptional<PagedResult<User>>(apiEndpoints.users.paged, {
        query: { search, page, pageSize: PAGE_SIZE },
      }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};
