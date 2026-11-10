import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { RemoveEstablishmentUserData } from '../types';

export const useRemoveEstablishmentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ establishmentId, userId }: RemoveEstablishmentUserData) =>
      http<void>(`establishments/${establishmentId}/users/${userId}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
};
