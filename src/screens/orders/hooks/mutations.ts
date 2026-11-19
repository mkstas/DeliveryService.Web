import { apiEndpoints, http, queryKeys } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateOrderStatusData } from '../types';

type WithId<T> = T & { id: string };

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: WithId<UpdateOrderStatusData>) =>
      http<void>(apiEndpoints.orders.status(id), { method: 'PATCH', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.orders }),
  });
};
