import { apiEndpoints, httpOptional, type Order, type PagedResult, queryKeys } from '@/shared/api';
import { PAGE_SIZE } from '@/shared/config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: () => httpOptional<Order[]>(apiEndpoints.orders.all),
  });
};

export const usePagedOrders = (page: number) => {
  return useQuery<PagedResult<Order> | null>({
    queryKey: [...queryKeys.orders, 'paged', page],
    queryFn: () => httpOptional<PagedResult<Order>>(apiEndpoints.orders.paged, { query: { page, pageSize: PAGE_SIZE } }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};
