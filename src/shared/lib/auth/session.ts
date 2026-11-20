import { apiEndpoints, http, HttpError, queryKeys, type Restaurant } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

const isMissingOrForbidden = (error: unknown): boolean =>
  error instanceof HttpError && (error.status === 401 || error.status === 403 || error.status === 404);

/**
 * Requests data from a manager-scoped endpoint, treating "no restaurant" (404) as `null`.
 */
export const httpManagerOptional = async <T>(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): Promise<T | null> => {
  try {
    return await http<T>(path, { query });
  } catch (error) {
    if (isMissingOrForbidden(error)) {
      return null;
    }

    throw error;
  }
};

/**
 * The restaurant assigned to the current manager.
 */
export const useMyRestaurant = () => {
  return useQuery<Restaurant | null>({
    queryKey: queryKeys.myRestaurant,
    queryFn: () => httpManagerOptional<Restaurant>(apiEndpoints.restaurants.me),
    retry: false,
  });
};
