import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/common/api';
import { updateUserBio } from '../api';

export const useUpdateUserBio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserBio,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};
