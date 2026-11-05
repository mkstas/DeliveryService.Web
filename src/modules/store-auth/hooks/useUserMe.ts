import { useQuery } from '@tanstack/react-query';
import { http, HttpError, queryKeys } from '@/common/api';
import { User } from '../types';

export const useUserMe = () => {
  return useQuery<User | null>({
    queryKey: queryKeys.user.me,
    queryFn: async () => {
      try {
        return await http<User>('users/me');
      } catch (error) {
        if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
    retry: false,
  });
};
