import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { RolePermissionData } from '../type';

type ToggleRolePermissionData = RolePermissionData & {
  assign: boolean;
};

export const useToggleRolePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assign, ...data }: ToggleRolePermissionData) =>
      assign
        ? http<void>('roles/permissions', { method: 'POST', body: data })
        : http<void>(`roles/${data.roleId}/permissions/${data.permissionId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
  });
};
