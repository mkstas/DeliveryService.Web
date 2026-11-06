import { useQuery } from '@tanstack/react-query';
import { http, HttpError, queryKeys } from '@/common/api';
import { Establishment } from '../types';

export const useEstablishments = () => {
  return useQuery({
    queryKey: queryKeys.establishments,
    queryFn: async () => {
      try {
        return await http<Establishment[]>('establishments');
      } catch (error) {
        if (error instanceof HttpError && (error.status === 401 || error.status === 403)) {
          return null;
        }

        throw error;
      }
    },
  });
};
