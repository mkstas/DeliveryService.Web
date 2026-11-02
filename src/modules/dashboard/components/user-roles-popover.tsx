'use client';

import { FC } from 'react';
import { ChevronDownIcon, LoaderCircleIcon } from 'lucide-react';
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/common/components';
import { useUserRoles } from '../hooks/useUserRoles';
import { Role, UserListItem } from '../types';

type UserRolesPopoverProps = {
  user: UserListItem;
  roles: Role[];
  isRolesPending: boolean;
  isRolesError: boolean;
};

export const UserRolesPopover: FC<UserRolesPopoverProps> = ({ user, roles, isRolesPending, isRolesError }) => {
  const { selected, pendingIds, error, toggle } = useUserRoles(user);

  return (
    <Popover>
      <PopoverTrigger render={<Button variant='outline' size='xs' />}>
        Назначить роли
        <ChevronDownIcon className='text-muted-foreground' />
      </PopoverTrigger>

      <PopoverContent align='start' className='w-64'>
        <PopoverHeader>
          <PopoverTitle>Роли пользователя</PopoverTitle>
          <PopoverDescription>{user.emailAddress}</PopoverDescription>
        </PopoverHeader>

        {isRolesPending ? (
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <LoaderCircleIcon className='size-4 animate-spin' />
            Загрузка ролей
          </div>
        ) : isRolesError ? (
          <p className='text-sm text-muted-foreground'>Не удалось загрузить список ролей</p>
        ) : roles.length === 0 ? (
          <p className='text-sm text-muted-foreground'>Нет доступных ролей</p>
        ) : (
          <div className='flex flex-col gap-1'>
            {roles.map(role => {
              const isChecked = selected.includes(role.id);
              const isPending = pendingIds.includes(role.id);

              return (
                <div
                  key={role.id}
                  onClick={() => {
                    if (!isPending) {
                      toggle(role, !isChecked);
                    }
                  }}
                  className='flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors select-none hover:bg-muted/50'
                >
                  <Checkbox
                    checked={isChecked}
                    disabled={isPending}
                    onClick={event => event.stopPropagation()}
                    onCheckedChange={assign => toggle(role, assign)}
                  />
                  <span className='flex-1'>{role.name}</span>
                  {isPending && <LoaderCircleIcon className='size-4 animate-spin text-muted-foreground' />}
                </div>
              );
            })}
          </div>
        )}

        {error && <p className='text-xs text-destructive'>{error}</p>}
      </PopoverContent>
    </Popover>
  );
};
