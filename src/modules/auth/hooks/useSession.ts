import { useQuery } from '@tanstack/react-query';
import { ApiError, queryKeys } from '@/common/api';
import { fetchMe } from '../api';
import type { User } from '../types';

export const useSession = () =>
  useQuery<User | null>({
    queryKey: queryKeys.user.me,
    queryFn: async () => {
      try {
        return await fetchMe();
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
    retry: false,
    staleTime: 60_000,
  });
