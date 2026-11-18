import { useQuery } from '@tanstack/react-query';
import { apiEndpoints, httpOptional, type Permission, queryKeys, type Role } from '@/common/api';

export const useRoles = () => {
  return useQuery({
    queryKey: queryKeys.roles,
    queryFn: () => httpOptional<Role[]>(apiEndpoints.roles.all),
  });
};

export const usePermissions = () => {
  return useQuery({
    queryKey: queryKeys.permissions,
    queryFn: () => httpOptional<Permission[]>(apiEndpoints.permissions),
  });
};
