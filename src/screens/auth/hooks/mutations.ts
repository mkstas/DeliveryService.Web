import { apiEndpoints, http, queryKeys } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConfirmData, LoginData, RegisterData, ResendData } from '../types';

// Session logout lives in the shared layer; re-exported for page-level usage.
export { useLogout } from '@/shared/lib/auth/hooks';

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
