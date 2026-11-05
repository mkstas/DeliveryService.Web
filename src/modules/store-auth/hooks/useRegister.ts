import { useMutation } from '@tanstack/react-query';
import { http } from '@/common/api';
import { RegisterData } from '../types';

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => http<void>('auth/register', { method: 'POST', body: data }),
  });
};
