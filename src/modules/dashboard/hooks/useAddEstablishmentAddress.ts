import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/common/api';
import { addEstablishmentAddress } from '../api';

export const useAddEstablishmentAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEstablishmentAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
};
