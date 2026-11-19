import { apiEndpoints, httpOptional, queryKeys, type Specification } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export const useSpecifications = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.specifications, search ?? ''],
    queryFn: () => httpOptional<Specification[]>(apiEndpoints.specifications.all, { query: { search } }),
  });
};
