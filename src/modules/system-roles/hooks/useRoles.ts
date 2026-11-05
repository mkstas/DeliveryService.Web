import { useQuery } from '@tanstack/react-query';
import { http, HttpError, queryKeys } from '@/common/api';
import { Role } from '@/modules/store-auth';

export const useRoles = () => {
  return useQuery({
    queryKey: queryKeys.roles,
    queryFn: async () => {
      try {
        return await http<Role[]>('roles');
      } catch (error) {
        if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
  });
};
