import { useQuery } from '@tanstack/react-query';
import { apiEndpoints, httpOptional, queryKeys, type User } from '@/common/api';

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.user.all,
    queryFn: () => httpOptional<User[]>(apiEndpoints.users.all),
  });
};
