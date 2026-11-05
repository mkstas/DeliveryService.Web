import { useQuery } from '@tanstack/react-query';
import { http, HttpError, queryKeys } from '@/common/api';
import { Permission } from '@/modules/store-auth';

export const usePermissions = () => {
  return useQuery({
    queryKey: queryKeys.permissions,
    queryFn: async () => {
      try {
        return await http<Permission[]>('permissions');
      } catch (error) {
        if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
  });
};
