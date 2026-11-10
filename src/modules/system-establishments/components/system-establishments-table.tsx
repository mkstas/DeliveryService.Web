'use client';

import { FC } from 'react';
import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/components';
import { useEstablishments } from '../hooks/useEstablishments';
import { EstablishmentUsersDialog } from './establishments-users-dialog';
import { UpdateEstablishmentDialog } from './update-establishment-dialog';

export const SystemEstablishmentsTable: FC = () => {
  const { data: establishments, isLoading } = useEstablishments();

  if (isLoading) {
    return (
      <div className='border rounded-lg overflow-hidden'>
        <Table className='table-fixed'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-48'>
                <Skeleton className='w-24 h-5 rounded-md' />
              </TableHead>
              <TableHead className='w-48'>
                <Skeleton className='w-24 h-5 rounded-md' />
              </TableHead>
              <TableHead>
                <Skeleton className='w-24 h-5 ml-auto rounded-md' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className='h-5 w-32 rounded-md' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-32 rounded-md' />
                </TableCell>
                <TableCell className='flex justify-end gap-2'>
                  <Skeleton className='h-8 w-32 rounded-lg' />
                  <Skeleton className='h-8 w-32 rounded-lg' />
                  <Skeleton className='h-8 w-10 rounded-lg' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className='border rounded-lg overflow-hidden'>
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
              <TableCell className='flex items-center gap-2 justify-end'>
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
