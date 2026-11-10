import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { UpdateEstablishmentData } from '../types';

type UpdateEstablishmentVariables = UpdateEstablishmentData & {
  id: string;
};

export const useUpdateEstablishment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name, businessAccount }: UpdateEstablishmentVariables) =>
      http<void>(`establishments/${id}`, { method: 'PUT', body: { name, businessAccount } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.establishments });
    },
  });
};
