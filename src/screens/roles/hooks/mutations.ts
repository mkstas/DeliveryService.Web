import { apiEndpoints, http, queryKeys } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    mutationFn: (data: CreateRoleData) => http<void>(apiEndpoints.roles.all, { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: UpdateRoleVariables) =>
      http<void>(apiEndpoints.roles.byId(id), { method: 'PUT', body: { name } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => http<void>(apiEndpoints.roles.byId(id), { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};

export const useToggleRolePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assign, ...data }: ToggleRolePermissionData) =>
      assign
        ? http<void>(apiEndpoints.roles.permissions, { method: 'POST', body: data })
        : http<void>(apiEndpoints.roles.permission(data.roleId, data.permissionId), { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
  });
};
