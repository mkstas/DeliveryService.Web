import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { AddEstablishmentUserData } from '../types';

export const useAddEstablishmentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddEstablishmentUserData) => http<void>('establishments/users', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
};
