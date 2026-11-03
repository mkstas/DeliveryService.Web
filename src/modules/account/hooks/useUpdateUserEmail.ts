import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/common/api';
import { updateUserEmail } from '../api';

export const useUpdateUserEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserEmail,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};
