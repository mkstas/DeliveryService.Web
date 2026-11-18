import { useQuery } from '@tanstack/react-query';
import { apiEndpoints, httpOptional, queryKeys, type Specification } from '@/common/api';

export const useSpecifications = () => {
  return useQuery({
    queryKey: queryKeys.specifications,
    queryFn: () => httpOptional<Specification[]>(apiEndpoints.specifications.all),
  });
};
