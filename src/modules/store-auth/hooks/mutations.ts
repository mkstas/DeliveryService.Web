import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEndpoints, http, queryKeys } from '@/common/api';
import { ConfirmData, LoginData, RegisterData, ResendData } from '../types';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginData) => http<void>(apiEndpoints.auth.login, { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => http<void>(apiEndpoints.auth.register, { method: 'POST', body: data }),
  });
};

export const useConfirm = () => {
  return useMutation({
    mutationFn: (data: ConfirmData) => http<void>(apiEndpoints.auth.confirmEmail, { method: 'POST', body: data }),
  });
};

export const useResend = () => {
  return useMutation({
    mutationFn: (data: ResendData) => http<void>(apiEndpoints.auth.resendConfirmation, { method: 'POST', body: data }),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => http<void>(apiEndpoints.auth.logout, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};
