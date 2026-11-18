import { useQuery } from '@tanstack/react-query';
import { apiEndpoints, httpOptional, type Order, queryKeys } from '@/common/api';

export const useOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: () => httpOptional<Order[]>(apiEndpoints.orders.all),
  });
};
