import { useQuery } from '@tanstack/react-query';
import { ApiError, queryKeys } from '@/common/api';
import { getPermissions } from '../api';
import { Permission } from '../types';

export const usePermissions = () => {
  return useQuery<Permission[] | null>({
    queryKey: queryKeys.permissions,
    queryFn: async () => {
      try {
        return await getPermissions();
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
  });
};
