import { useMutation } from '@tanstack/react-query';
import { http } from '@/common/api';
import { ResendData } from '../types';

export const useResend = () => {
  return useMutation({
    mutationFn: (data: ResendData) => http<void>('auth/email/resend', { method: 'POST', body: data }),
  });
};
