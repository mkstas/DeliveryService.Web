import { useQuery } from '@tanstack/react-query';
import { httpOptional, queryKeys, type User } from '@/common/api';

export const useUserMe = () => {
  return useQuery<User | null>({
    queryKey: queryKeys.user.me,
    queryFn: () => httpOptional<User>('users/me'),
    retry: false,
  });
};
