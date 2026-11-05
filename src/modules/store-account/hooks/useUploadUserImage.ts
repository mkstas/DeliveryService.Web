import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { UploadUserImageData } from '../types';

export const useUploadUserImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file }: UploadUserImageData) => {
      const body = new FormData();
      body.append('file', file);

      return http<void>('static/users/image', { method: 'POST', body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
