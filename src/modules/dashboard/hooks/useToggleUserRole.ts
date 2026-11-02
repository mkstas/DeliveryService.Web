import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/common/api';
import { addUserRole, removeUserRole } from '../api';
import { UserRoleData } from '../types';

type ToggleUserRoleData = UserRoleData & {
  assign: boolean;
};

export const useToggleUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assign, ...data }: ToggleUserRoleData) => (assign ? addUserRole(data) : removeUserRole(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
  });
};
