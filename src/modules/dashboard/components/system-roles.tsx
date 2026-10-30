'use client';

import { FC, useState } from 'react';
import { PlusIcon, ShieldAlertIcon, UserShieldIcon } from 'lucide-react';
import { Accordion, Button, Skeleton } from '@/common/components';
import { usePermissions } from '../hooks/usePermissions';
import { useRoles } from '../hooks/useRoles';
import { RoleDialog } from './role-dialog';
import { RoleItem } from './role-item';
import { RolesState } from './roles-state';

export const SystemRoles: FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data: permissions, isPending: isPendingPermissions } = usePermissions();
  const { data: roles, isPending, isError, refetch } = useRoles();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <span className='rounded-full border bg-card px-3 py-1 text-xs font-medium'>Ролей: {roles?.length ?? 0}</span>
          <span className='rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground'>
            Разрешений: {permissions?.length ?? 0}
          </span>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <PlusIcon />
          Создать роль
        </Button>
      </div>

      {isPending || isPendingPermissions ? (
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='h-18 rounded-2xl' />
          ))}
        </div>
      ) : isError ? (
        <RolesState
          icon={ShieldAlertIcon}
          tone='destructive'
          title='Не удалось загрузить роли'
          description='Попробуйте повторить запрос.'
          action={{ label: 'Повторить', onClick: () => refetch(), variant: 'outline' }}
        />
      ) : !roles ? (
        <RolesState icon={ShieldAlertIcon} title='Недостаточно прав' description='У вас нет доступа к списку ролей.' />
      ) : roles.length === 0 ? (
        <RolesState
          icon={UserShieldIcon}
          title='Ролей пока нет'
          description='Создайте первую роль, чтобы назначать права доступа сотрудникам.'
          action={{ label: 'Создать роль', onClick: () => setIsCreateOpen(true), icon: PlusIcon }}
        />
      ) : (
        <Accordion className='bg-card'>
          {roles.map(role => (
            <RoleItem key={role.id} role={role} permissions={permissions ?? []} />
          ))}
        </Accordion>
      )}

      <RoleDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
};
