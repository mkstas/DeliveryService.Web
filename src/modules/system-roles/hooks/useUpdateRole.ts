import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { UpdateRoleData } from '../type';

type UpdateRoleVariables = UpdateRoleData & {
  id: string;
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
