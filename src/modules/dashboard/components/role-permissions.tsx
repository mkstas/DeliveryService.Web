'use client';

import { FC } from 'react';
import { CheckIcon } from 'lucide-react';
import { Permission, Role } from '../types';
import { PermissionOption } from './permission-option';

type RolePermissionsProps = {
  role: Role;
  permissions: Permission[];
  selected: string[];
  pendingIds: string[];
  error: string | null;
  onToggle: (permission: Permission, assign: boolean) => void;
};

export const RolePermissions: FC<RolePermissionsProps> = ({
  role,
  permissions,
  selected,
  pendingIds,
  error,
  onToggle,
}) => {
  if (permissions.length === 0) {
    return (
      <div className='flex flex-wrap gap-2'>
        {role.permissions.length > 0 ? (
          role.permissions.map(permission => (
            <span
              key={permission.id}
              className='inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground'
            >
              <CheckIcon className='size-3 text-primary' />
              {permission.displayName}
            </span>
          ))
        ) : (
          <p className='text-sm text-muted-foreground'>Разрешения не назначены</p>
        )}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <span className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>Разрешения</span>
        <span className='text-xs text-muted-foreground'>
          Выбрано {selected.length} из {permissions.length}
        </span>
      </div>

      <div className='grid gap-2 sm:grid-cols-2'>
        {permissions.map(permission => (
          <PermissionOption
            key={permission.id}
            permission={permission}
            checked={selected.includes(permission.id)}
            isPending={pendingIds.includes(permission.id)}
            onToggle={assign => onToggle(permission, assign)}
          />
        ))}
      </div>

      {error && <p className='text-sm text-destructive'>{error}</p>}
    </div>
  );
};
