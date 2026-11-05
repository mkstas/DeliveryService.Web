import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { ResendUserEmailData } from '../types';

export const useResendUserEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ResendUserEmailData) => http<void>('auth/email/resend', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};
