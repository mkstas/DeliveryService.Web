'use client';

import { type ReactNode } from 'react';
import { cn } from 'cn';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSkeleton } from '@/common/components';

export type EntityColumn<T> = {
  header: string;
  className?: string;
  cellClassName?: string;
  cell: (item: T) => ReactNode;
};

type EntityTableProps<T> = {
  items: T[];
  columns: EntityColumn<T>[];
  getRowKey: (item: T) => string;
  isLoading?: boolean;
  withAvatar?: boolean;
  avatarClassName?: string;
  emptyMessage?: string;
};

export const EntityTable = <T,>({
  items,
  columns,
  getRowKey,
  isLoading,
  withAvatar,
  avatarClassName,
  emptyMessage = 'Записи не найдены',
}: EntityTableProps<T>) => {
  if (isLoading) {
    return <TableSkeleton columns={columns.length} withAvatar={withAvatar} avatarClassName={avatarClassName} />;
  }

  if (items.length === 0) {
    return (
      <div className='flex min-h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground'>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={getRowKey(item)}>
              {columns.map((column, index) => (
                <TableCell key={index} className={cn(column.cellClassName, 'min-h-12')}>
                  {column.cell(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
