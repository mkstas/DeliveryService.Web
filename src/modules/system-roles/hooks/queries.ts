import { useQuery } from '@tanstack/react-query';
import { httpOptional, type Permission, queryKeys, type Role } from '@/common/api';

export const useRoles = () => {
  return useQuery({
    queryKey: queryKeys.roles,
    queryFn: () => httpOptional<Role[]>('roles'),
  });
};

export const usePermissions = () => {
  return useQuery({
    queryKey: queryKeys.permissions,
    queryFn: () => httpOptional<Permission[]>('permissions'),
  });
};
