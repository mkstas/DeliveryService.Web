import { apiEndpoints, type Dish, type Order, queryKeys } from '@/shared/api';
import { httpManagerOptional } from '@/shared/lib/auth/session';
import { useQuery } from '@tanstack/react-query';

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
