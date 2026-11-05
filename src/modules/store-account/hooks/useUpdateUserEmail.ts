import { useMutation } from '@tanstack/react-query';
import { http } from '@/common/api';
import { UpdateUserEmailData } from '../types';

export const useUpdateUserEmail = () => {
  return useMutation({
    mutationFn: (data: UpdateUserEmailData) => http<void>('users/me/email', { method: 'PATCH', body: data }),
  });
};
