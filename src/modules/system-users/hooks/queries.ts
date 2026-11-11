import { useQuery } from '@tanstack/react-query';
import { httpOptional, queryKeys, type User } from '@/common/api';

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => httpOptional<User[]>('users'),
  });
};
