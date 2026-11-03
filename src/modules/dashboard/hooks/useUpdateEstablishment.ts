import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/common/api';
import { updateEstablishment } from '../api';
import { UpdateEstablishmentData } from '../types';

type UpdateEstablishmentMutationData = {
  id: string;
  data: UpdateEstablishmentData;
};

export const useUpdateEstablishment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateEstablishmentMutationData) => updateEstablishment(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
};
