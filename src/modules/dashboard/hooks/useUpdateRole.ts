import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/common/api';
import { updateRole } from '../api';
import { UpdateRoleData } from '../types';

type UpdateRoleMutationData = {
  id: string;
  data: UpdateRoleData;
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateRoleMutationData) => updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
  });
};
