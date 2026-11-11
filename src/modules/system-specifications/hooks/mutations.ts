import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import { CreateSpecificationData, UpdateSpecificationData } from '../types';

type UpdateSpecificationVariables = UpdateSpecificationData & {
  id: string;
};

export const useCreateSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSpecificationData) => http<void>('specifications', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.specifications });
    },
  });
};

export const useUpdateSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: UpdateSpecificationVariables) =>
      http<void>(`specifications/${id}`, { method: 'PUT', body: { name } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.specifications });
    },
  });
};
