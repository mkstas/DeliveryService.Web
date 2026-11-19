import { apiEndpoints, httpOptional, type Order, queryKeys } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export const useOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: () => httpOptional<Order[]>(apiEndpoints.orders.all),
  });
};
