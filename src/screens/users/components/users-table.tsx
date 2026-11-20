'use client';

import { type EntityColumn, EntityTable, PaginationControls } from '@/features/crud';
import { useRoles } from '@/screens/roles';
import type { User } from '@/shared/api';
import { useClampPage, useScreenPagination } from '@/shared/lib/hooks';
import { UserCell } from '@/shared/ui';
import { usePagedUsers } from '../hooks/queries';
import { RolesDialog } from './roles-dialog';

export const UsersTable = ({ search }: { search?: string }) => {
  const { page, setPage } = useScreenPagination(search);
  const { data, isLoading: isLoadingUsers } = usePagedUsers(search, page);
  const { isLoading: isLoadingRoles } = useRoles();

  useClampPage(page, setPage, data?.totalPages ?? 0);

  const columns: EntityColumn<User>[] = [
    {
      header: 'Имя пользователя',
      className: 'w-48',
      cell: user => <UserCell imageUrl={user.imageUrl} name={user.name} />,
    },
    {
      header: 'Электронная почта',
      className: 'w-48',
      cell: user => <span>{user.emailAddress}</span>,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex items-center justify-end gap-2',
      cell: user => <RolesDialog user={user} />,
    },
  ];

  return (
    <>
      <EntityTable
        items={data?.items ?? []}
        columns={columns}
        getRowKey={user => user.id}
        isLoading={isLoadingUsers || isLoadingRoles}
        withAvatar
        emptyMessage='Пользователи не найдены'
      />
      <PaginationControls
        page={page}
        totalPages={data?.totalPages ?? 0}
        totalCount={data?.totalCount}
        onPageChange={setPage}
      />
    </>
  );
};
