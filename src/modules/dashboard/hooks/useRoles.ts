import { useQuery } from '@tanstack/react-query';
import { ApiError, queryKeys } from '@/common/api';
import { getRoles } from '../api';
import { Role } from '../types';

export const useRoles = () => {
  return useQuery<Role[] | null>({
    queryKey: queryKeys.roles,
    queryFn: async () => {
      try {
        return await getRoles();
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
  });
};
