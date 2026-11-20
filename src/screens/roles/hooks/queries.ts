import { apiEndpoints, httpOptional, type PagedResult, type Permission, queryKeys, type Role } from '@/shared/api';
import { PAGE_SIZE } from '@/shared/config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useRoles = () => {
  return useQuery({
    queryKey: queryKeys.roles,
    queryFn: () => httpOptional<Role[]>(apiEndpoints.roles.all),
  });
};

export const usePagedRoles = (page: number) => {
  return useQuery<PagedResult<Role> | null>({
    queryKey: [...queryKeys.roles, 'paged', page],
    queryFn: () => httpOptional<PagedResult<Role>>(apiEndpoints.roles.paged, { query: { page, pageSize: PAGE_SIZE } }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};

export const usePermissions = () => {
  return useQuery({
    queryKey: queryKeys.permissions,
    queryFn: () => httpOptional<Permission[]>(apiEndpoints.permissions),
  });
};
