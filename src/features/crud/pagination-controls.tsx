'use client';

import { Button } from '@/shared/ui';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from 'cn';

export type PaginationControlsProps = {
  page: number;
  totalPages: number;
  totalCount?: number;
  onPageChange: (page: number) => void;
};

type EllipsisKey = `ellipsis-${number}-${number}`;

const getVisiblePages = (page: number, totalPages: number): Array<number | EllipsisKey> => {
  const pages = [...new Set([1, totalPages, page - 1, page, page + 1])]
    .filter(candidate => candidate >= 1 && candidate <= totalPages)
    .sort((left, right) => left - right);

  return pages.flatMap<number | EllipsisKey>((candidate, index) => {
    const previous = pages[index - 1];

    return index > 0 && candidate - previous > 1 ? [`ellipsis-${previous}-${candidate}`, candidate] : [candidate];
  });
};

export const PaginationControls = ({ page, totalPages, totalCount, onPageChange }: PaginationControlsProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className='flex flex-col items-center gap-2 sm:flex-row sm:justify-between'>
      <span className='text-xs text-muted-foreground'>
        {totalCount !== undefined && `Всего: ${totalCount} · `}Страница {page} из {totalPages}
      </span>
      <div className='flex items-center gap-1'>
        <Button
          type='button'
          variant='outline'
          size='icon'
          aria-label='Предыдущая страница'
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeftIcon />
        </Button>
        {getVisiblePages(page, totalPages).map(item =>
          typeof item === 'number' ? (
            <Button
              key={item}
              type='button'
              variant={item === page ? 'outline' : 'ghost'}
              size='icon'
              aria-label={`Страница ${item}`}
              aria-current={item === page ? 'page' : undefined}
              className={cn(item === page && 'font-semibold')}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          ) : (
            <span key={item} className='flex size-8 items-center justify-center text-muted-foreground'>
              …
            </span>
          ),
        )}
        <Button
          type='button'
          variant='outline'
          size='icon'
          aria-label='Следующая страница'
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};
