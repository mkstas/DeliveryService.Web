'use client';

import { type EntityColumn, EntityTable, PaginationControls, RemoveDialog, UpdateNamedEntityDialog } from '@/features/crud';
import type { Role } from '@/shared/api';
import { useClampPage, useScreenPagination } from '@/shared/lib/hooks';
import { Badge } from '@/shared/ui';
import { useDeleteRole, useUpdateRole } from '../hooks/mutations';
import { usePagedRoles } from '../hooks/queries';
import { roleTexts } from '../texts';
import { PermissionsDialog } from './permissions-dialog';

export const RolesTable = () => {
  const { page, setPage } = useScreenPagination();
  const { data, isLoading } = usePagedRoles(page);
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();

  useClampPage(page, setPage, data?.totalPages ?? 0);

  const columns: EntityColumn<Role>[] = [
    {
      header: 'Название',
      className: 'w-48',
      cell: role => (
        <div className='flex items-center gap-2'>
          <span>{role.name}</span>
          {role.isBuiltIn && <Badge variant='secondary'>Встроенная</Badge>}
        </div>
      ),
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: role =>
        role.isBuiltIn ? null : (
          <>
            <PermissionsDialog role={role} />
            <UpdateNamedEntityDialog
              entity={role}
              texts={roleTexts}
              onSave={name => updateRole.mutateAsync({ id: role.id, name })}
            />
            <RemoveDialog
              title='Удаление роли'
              description={`Роль «${role.name}» будет удалена`}
              ariaLabel='Удалить роль'
              onConfirm={() => deleteRole.mutateAsync(role.id)}
            />
          </>
        ),
    },
  ];

  return (
    <>
      <EntityTable
        items={data?.items ?? []}
        columns={columns}
        getRowKey={role => role.id}
        isLoading={isLoading}
        emptyMessage='Роли не найдены'
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
