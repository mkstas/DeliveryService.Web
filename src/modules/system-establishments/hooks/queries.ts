import { useQuery } from '@tanstack/react-query';
import { httpOptional, queryKeys } from '@/common/api';
import { Establishment } from '../types';

export const useEstablishments = () => {
  return useQuery({
    queryKey: queryKeys.establishments,
    queryFn: () => httpOptional<Establishment[]>('establishments'),
  });
};
