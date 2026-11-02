'use client';

import { FC, useState } from 'react';
import { PlusIcon, ShieldAlertIcon, UserShieldIcon } from 'lucide-react';
import { Accordion, Badge, Button, Skeleton } from '@/common/components';
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
      <div className='flex flex-wrap items-center gap-2'>
        {isPending ? (
          <Skeleton className='h-5 w-20 rounded-4xl' />
        ) : (
          <Badge variant='secondary'>Ролей: {roles?.length ?? 0}</Badge>
        )}
        {isPendingPermissions ? (
          <Skeleton className='h-5 w-28 rounded-4xl' />
        ) : (
          <Badge variant='secondary'>Разрешений: {permissions?.length ?? 0}</Badge>
        )}
      </div>

      {isPending || isPendingPermissions ? (
        <div className='divide-y overflow-hidden rounded-2xl border bg-card'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className='flex items-center gap-3 px-5 py-4'>
              <Skeleton className='size-10 shrink-0 rounded-xl' />
              <div className='flex flex-1 flex-col gap-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-24' />
              </div>
              <Skeleton className='size-4 shrink-0 rounded-md' />
            </div>
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

      {isPending || isPendingPermissions ? (
        <div className='flex justify-end'>
          <Skeleton className='h-9 w-36 rounded-4xl' />
        </div>
      ) : (
        !isError &&
        roles &&
        roles.length > 0 && (
          <div className='flex justify-end'>
            <Button onClick={() => setIsCreateOpen(true)}>
              <PlusIcon />
              Создать роль
            </Button>
          </div>
        )
      )}

      <RoleDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
};
