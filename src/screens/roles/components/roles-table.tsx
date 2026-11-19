'use client';

import { type EntityColumn, EntityTable, RemoveDialog, UpdateNamedEntityDialog } from '@/features/crud';
import type { Role } from '@/shared/api';
import { Badge } from '@/shared/ui';
import { useDeleteRole, useUpdateRole } from '../hooks/mutations';
import { useRoles } from '../hooks/queries';
import { roleTexts } from '../texts';
import { PermissionsDialog } from './permissions-dialog';

export const RolesTable = () => {
  const { data: roles, isLoading } = useRoles();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();

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
    <EntityTable
      items={roles ?? []}
      columns={columns}
      getRowKey={role => role.id}
      isLoading={isLoading}
      emptyMessage='Роли не найдены'
    />
  );
};
