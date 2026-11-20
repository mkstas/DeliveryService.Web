import { apiEndpoints, http, httpOptional, queryKeys, type User } from '@/shared/api';
import { ROUTES } from '@/shared/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * The current authenticated user, or `null` for anonymous visitors.
 */
export const useUserMe = () => {
  return useQuery<User | null>({
    queryKey: queryKeys.user.me,
    queryFn: () => httpOptional<User>(apiEndpoints.users.me),
    retry: false,
  });
};

/**
 * System names of the permissions granted to the current user.
 * Returns `null` for anonymous users.
 */
export const useMyPermissions = () => {
  return useQuery<string[] | null>({
    queryKey: queryKeys.myPermissions,
    queryFn: () => httpOptional<string[]>(apiEndpoints.myPermissions),
    retry: false,
  });
};

/**
 * Ends the current session.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => http<void>(apiEndpoints.auth.logout, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.user.me, null);
      window.location.replace(ROUTES.STORE);
    },
  });
};
