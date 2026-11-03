import { useQuery } from '@tanstack/react-query';
import { ApiError, queryKeys } from '@/common/api';
import { getEstablishments } from '../api';
import { Establishment } from '../types';

export const useEstablishments = () => {
  return useQuery<Establishment[] | null>({
    queryKey: queryKeys.establishments,
    queryFn: async () => {
      try {
        return await getEstablishments();
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
  });
};
