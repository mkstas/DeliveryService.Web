import { useQuery } from '@tanstack/react-query';
import { ApiError, queryKeys } from '@/common/api';
import { getUsers } from '../api';
import { UserListItem } from '../types';

export const useUsers = () => {
  return useQuery<UserListItem[] | null>({
    queryKey: queryKeys.users,
    queryFn: async () => {
      try {
        return await getUsers();
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
  });
};
