import { apiEndpoints, type Dish, type Order, type PagedResult, queryKeys } from '@/shared/api';
import { PAGE_SIZE } from '@/shared/config';
import { httpManagerOptional } from '@/shared/lib/auth/session';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// Session-scoped restaurant query lives in the shared layer; re-exported for page-level usage.
export { httpManagerOptional, useMyRestaurant } from '@/shared/lib/auth/session';

/**
 * Dishes of the current manager restaurant.
 */
export const useMyDishes = (search?: string) => {
  return useQuery<Dish[] | null>({
    queryKey: [...queryKeys.dishes, 'me', search ?? ''],
    queryFn: () => httpManagerOptional<Dish[]>(apiEndpoints.dishes.me, { search }),
    retry: false,
  });
};

export const usePagedMyDishes = (search: string | undefined, page: number) => {
  return useQuery<PagedResult<Dish> | null>({
    queryKey: [...queryKeys.dishes, 'me', 'paged', search ?? '', page],
    queryFn: () =>
      httpManagerOptional<PagedResult<Dish>>(apiEndpoints.dishes.pagedMe, {
        search,
        page,
        pageSize: PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};

/**
 * Orders that contain dishes of the current manager restaurant.
 */
export const useMyRestaurantOrders = () => {
  return useQuery<Order[] | null>({
    queryKey: [...queryKeys.orders, 'me'],
    queryFn: () => httpManagerOptional<Order[]>(apiEndpoints.orders.me),
    retry: false,
  });
};

export const usePagedMyRestaurantOrders = (page: number) => {
  return useQuery<PagedResult<Order> | null>({
    queryKey: [...queryKeys.orders, 'me', 'paged', page],
    queryFn: () =>
      httpManagerOptional<PagedResult<Order>>(apiEndpoints.orders.pagedMe, {
        page,
        pageSize: PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
    retry: false,
  });
};
