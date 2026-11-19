import { apiEndpoints, type Category, httpOptional, queryKeys } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export const useCategories = (search?: string) => {
  return useQuery({
    queryKey: [...queryKeys.categories, search ?? ''],
    queryFn: () => httpOptional<Category[]>(apiEndpoints.categories.all, { query: { search } }),
  });
};
