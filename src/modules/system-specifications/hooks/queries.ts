import { useQuery } from '@tanstack/react-query';
import { httpOptional, queryKeys, type Specification } from '@/common/api';

export const useSpecifications = () => {
  return useQuery({
    queryKey: queryKeys.specifications,
    queryFn: () => httpOptional<Specification[]>('specifications'),
  });
};
