import { apiEndpoints, http, queryKeys } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateUserData, UserRoleData } from '../types';

type ToggleUserRoleData = UserRoleData & {
  assign: boolean;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserData) => http<void>(apiEndpoints.users.all, { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.all }),
  });
};

export const useToggleUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assign, ...data }: ToggleUserRoleData) =>
      assign
        ? http<void>(apiEndpoints.users.roles, { method: 'POST', body: data })
        : http<void>(apiEndpoints.users.role(data.userId, data.roleId), { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.all }),
  });
};
