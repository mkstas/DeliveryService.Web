import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEndpoints, http, queryKeys } from '@/common/api';
import { ConfirmUserEmailData, ResendUserEmailData, UpdateUserBioData, UploadUserImageData } from '../types';

export const useUpdateUserBio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserBioData) => http<void>(apiEndpoints.users.me, { method: 'PATCH', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};

export const useConfirmUserEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ConfirmUserEmailData) =>
      http<void>(apiEndpoints.auth.confirmEmail, { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};

export const useResendUserEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ResendUserEmailData) =>
      http<void>(apiEndpoints.auth.resendConfirmation, { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.user.me }),
  });
};

export const useUploadUserImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file }: UploadUserImageData) => {
      const body = new FormData();
      body.append('file', file);

      return http<void>(apiEndpoints.static.users, { method: 'POST', body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
