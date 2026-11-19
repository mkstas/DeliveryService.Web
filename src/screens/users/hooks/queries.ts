import { apiEndpoints, httpOptional, queryKeys, type User } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export const useUsers = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.user.all, search ?? ''],
    queryFn: () => httpOptional<User[]>(apiEndpoints.users.all, { query: { search } }),
  });
};
