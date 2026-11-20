import { PAGE_SIZE } from '@/shared/config';
import { useEffect, useState } from 'react';

export const useScreenPagination = (search?: string) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return { page, setPage, pageSize: PAGE_SIZE };
};

export const useClampPage = (
  page: number,
  setPage: (page: number) => void,
  totalPages: number,
) => {
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, setPage, totalPages]);
};
