import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { ConfirmData, LoginData, RegisterData, ResendData } from '../types';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginData) => http('auth/login', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => http<void>('auth/register', { method: 'POST', body: data }),
  });
};

export const useConfirm = () => {
  return useMutation({
    mutationFn: (data: ConfirmData) => http<void>('auth/email/confirm', { method: 'POST', body: data }),
  });
};

export const useResend = () => {
  return useMutation({
    mutationFn: (data: ResendData) => http<void>('auth/email/resend', { method: 'POST', body: data }),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => http<void>('/auth/logout', { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};
