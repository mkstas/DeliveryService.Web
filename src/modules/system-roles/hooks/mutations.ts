import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { CreateRoleData, RolePermissionData, UpdateRoleData } from '../types';

type UpdateRoleVariables = UpdateRoleData & {
  id: string;
};

type ToggleRolePermissionData = RolePermissionData & {
  assign: boolean;
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleData) => http<void>('roles', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: UpdateRoleVariables) => http<void>(`roles/${id}`, { method: 'PUT', body: { name } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles });
    },
  });
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
