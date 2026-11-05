import { useMutation } from '@tanstack/react-query';
import { http } from '@/common/api';
import { ConfirmData } from '../types';

export const useConfirm = () => {
  return useMutation({
    mutationFn: (data: ConfirmData) => http<void>('auth/email/confirm', { method: 'POST', body: data }),
  });
};
