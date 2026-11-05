import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { ConfirmUserEmailData } from '../types';

export const useConfirmUserEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ConfirmUserEmailData) => http<void>('auth/email/confirm', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};
