import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { UserRoleData } from '../types';

type ToggleUserRoleData = UserRoleData & {
  assign: boolean;
};

export const useToggleUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assign, ...data }: ToggleUserRoleData) =>
      assign
        ? http<void>('users/roles', { method: 'POST', body: data })
        : http<void>(`/users/${data.userId}/roles/${data.roleId}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.all }),
  });
};
