import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/common/api';
import { addRolePermission, removeRolePermission } from '../api';
import { RolePermissionData } from '../types';

type ToggleRolePermissionData = RolePermissionData & {
  assign: boolean;
};

export const useToggleRolePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assign, ...data }: ToggleRolePermissionData) =>
      assign ? addRolePermission(data) : removeRolePermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
  });
};
