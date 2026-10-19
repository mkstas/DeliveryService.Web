import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/common/api';
import { logout } from '../api';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};
