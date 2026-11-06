import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { CreateEstablishmentData } from '../types';

export const useCreateEstablishment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEstablishmentData) => http<void>('establishments', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
};
