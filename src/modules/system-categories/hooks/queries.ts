import { useQuery } from '@tanstack/react-query';
import { type Category, httpOptional, queryKeys } from '@/common/api';

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => httpOptional<Category[]>('categories'),
  });
};
