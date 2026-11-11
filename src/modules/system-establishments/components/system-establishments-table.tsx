'use client';

import { type FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSkeleton } from '@/common/components';
import { useEstablishments } from '../hooks/queries';
import { EstablishmentUsersDialog } from './establishments-users-dialog';
import { UpdateEstablishmentDialog } from './update-establishment-dialog';

export const SystemEstablishmentsTable: FC = () => {
  const { data: establishments, isLoading } = useEstablishments();

  if (isLoading) {
    return <TableSkeleton columns={3} />;
  }

  return (
    <div className='overflow-hidden rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-48'>Название</TableHead>
            <TableHead className='w-48'>Банковский счет</TableHead>
            <TableHead className='text-right'>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {establishments?.map(establishment => (
            <TableRow key={establishment.id}>
              <TableCell>{establishment.name}</TableCell>
              <TableCell>{establishment.businessAccount}</TableCell>
              <TableCell className='flex items-center justify-end gap-2'>
                <EstablishmentUsersDialog establishment={establishment} />
                <UpdateEstablishmentDialog establishment={establishment} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
