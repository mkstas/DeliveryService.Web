import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http, queryKeys } from '@/common/api';
import {
  AddEstablishmentAddressData,
  AddEstablishmentUserData,
  CreateEstablishmentData,
  RemoveEstablishmentAddressData,
  RemoveEstablishmentUserData,
  UpdateEstablishmentData,
} from '../types';

type UpdateEstablishmentVariables = UpdateEstablishmentData & {
  id: string;
};

export const useCreateEstablishment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEstablishmentData) => http<void>('establishments', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
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

export const useAddEstablishmentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddEstablishmentUserData) => http<void>('establishments/users', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
};

export const useRemoveEstablishmentUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ establishmentId, userId }: RemoveEstablishmentUserData) =>
      http<void>(`establishments/${establishmentId}/users/${userId}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
};

export const useAddEstablishmentAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddEstablishmentAddressData) =>
      http<void>('establishments/addresses', { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
};

export const useRemoveEstablishmentAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ establishmentId, addressId }: RemoveEstablishmentAddressData) =>
      http<void>(`establishments/${establishmentId}/addresses/${addressId}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.establishments }),
  });
};
