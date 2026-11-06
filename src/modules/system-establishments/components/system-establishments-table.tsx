'use client';

import { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/components';
import { useEstablishments } from '../hooks/useEstablishments';

export const SystemEstablishmentsTable: FC = () => {
  const { data: establishments, isLoading } = useEstablishments();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className='border rounded-lg overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Банковский счет</TableHead>
            <TableHead>Адреса заведений</TableHead>
            <TableHead>Пользователи</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {establishments?.map(establishment => (
            <TableRow key={establishment.id}>
              <TableCell>{establishment.name}</TableCell>
              <TableCell>{establishment.businessAccount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
