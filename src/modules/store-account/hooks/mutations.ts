import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import {
  ConfirmUserEmailData,
  ResendUserEmailData,
  UpdateUserBioData,
  UpdateUserEmailData,
  UploadUserImageData,
} from '../types';

export const useUpdateUserBio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserBioData) => http<void>('users/me/bio', { method: 'PATCH', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};

export const useUpdateUserEmail = () => {
  return useMutation({
    mutationFn: (data: UpdateUserEmailData) => http<void>('users/me/email', { method: 'PATCH', body: data }),
  });
};

export const useConfirmUserEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ConfirmUserEmailData) => http<void>('auth/email/confirm', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};

export const useResendUserEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ResendUserEmailData) => http<void>('auth/email/resend', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};

export const useUploadUserImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file }: UploadUserImageData) => {
      const body = new FormData();
      body.append('file', file);

      return http<void>('static/users', { method: 'POST', body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
