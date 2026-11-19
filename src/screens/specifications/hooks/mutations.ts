import { apiEndpoints, http, queryKeys } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSpecificationData, UpdateSpecificationData } from '../types';

type UpdateSpecificationVariables = UpdateSpecificationData & {
  id: string;
};

export const useCreateSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSpecificationData) =>
      http<void>(apiEndpoints.specifications.all, { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.specifications });
    },
  });
};

export const useUpdateSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: UpdateSpecificationVariables) =>
      http<void>(apiEndpoints.specifications.byId(id), { method: 'PUT', body: { name } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.specifications });
    },
  });
};

export const useDeleteSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => http<void>(apiEndpoints.specifications.byId(id), { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.specifications });
      queryClient.invalidateQueries({ queryKey: queryKeys.dishSpecifications });
    },
  });
};
