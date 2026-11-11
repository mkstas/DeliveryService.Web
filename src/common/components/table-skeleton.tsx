'use client';

import { type FC } from 'react';
import { Skeleton } from '@/common/components/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/components/table';

type TableSkeletonProps = {
  columns: number;
  rows?: number;
  withAvatar?: boolean;
};

export const TableSkeleton: FC<TableSkeletonProps> = ({ columns, rows = 3, withAvatar = false }) => {
  return (
    <div className='border rounded-lg overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index} className={index < columns - 1 ? 'w-48' : undefined}>
                <Skeleton className={index === columns - 1 ? 'w-24 h-5 ml-auto rounded-md' : 'w-24 h-5 rounded-md'} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) =>
                colIndex === columns - 1 ? (
                  <TableCell key={colIndex} className='flex justify-end gap-2'>
                    <Skeleton className='h-8 w-32 rounded-lg' />
                    <Skeleton className='h-8 w-10 rounded-lg' />
                  </TableCell>
                ) : (
                  <TableCell key={colIndex}>
                    {colIndex === 0 && withAvatar ? (
                      <div className='flex items-center gap-2'>
                        <Skeleton className='size-8 rounded-full' />
                        <Skeleton className='h-5 w-32 rounded-md' />
                      </div>
                    ) : (
                      <Skeleton className='h-5 w-32 rounded-md' />
                    )}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
