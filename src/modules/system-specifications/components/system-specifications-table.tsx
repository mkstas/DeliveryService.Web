'use client';

import { type FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSkeleton } from '@/common/components';
import { useSpecifications } from '../hooks/queries';
import { UpdateSpecificationDialog } from './update-specification-dialog';

export const SystemSpecificationsTable: FC = () => {
  const { data: specifications, isLoading } = useSpecifications();

  if (isLoading) {
    return <TableSkeleton columns={2} />;
  }

  return (
    <div className='overflow-hidden rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-48'>Название</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specifications?.map(specification => (
            <TableRow key={specification.id}>
              <TableCell>{specification.name}</TableCell>
              <TableCell className='flex justify-end gap-2'>
                <UpdateSpecificationDialog specification={specification} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
