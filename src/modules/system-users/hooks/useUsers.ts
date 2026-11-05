import { useQuery } from '@tanstack/react-query';
import { http, HttpError, queryKeys } from '@/common/api';
import { User } from '@/modules/store-auth';

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.user.all,
    queryFn: async () => {
      try {
        return await http<User[]>('users');
      } catch (error) {
        if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
  });
};
