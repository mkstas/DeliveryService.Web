import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/common/api';
import { register } from '../api';

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};
