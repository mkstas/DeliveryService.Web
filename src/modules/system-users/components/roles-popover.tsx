import { FC } from 'react';
import { ChevronDownIcon } from 'lucide-react';
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
import { User } from '@/modules/store-auth';
import { useRoles } from '@/modules/system-roles';
import { useToggleUserRole } from '../hooks/useToggleUserRole';

type RolesPopoverProps = {
  user: User;
};

export const RolesPopover: FC<RolesPopoverProps> = ({ user }) => {
  const { data: roles } = useRoles();
  const toggleRole = useToggleUserRole();
  const assignedRoleIds = new Set(user.roles.map(role => role.id));

  return (
    <Popover>
      <PopoverTrigger render={<Button variant='secondary' size='xs' />}>
        Назначить роли <ChevronDownIcon className='text-muted-foreground' />
      </PopoverTrigger>
      <PopoverContent className='overflow-y-auto max-h-(--available-height)'>
        <PopoverHeader>
          <PopoverTitle>Роли пользователя</PopoverTitle>
          <PopoverDescription>{user.emailAddress}</PopoverDescription>
        </PopoverHeader>
        <div className='grid min-h-0 items-start gap-2'>
          {roles?.map(role => (
            <div key={role.id} className='flex items-start gap-2'>
              <Checkbox
                id={`user-${user.id}-role-${role.id}`}
                className='mt-0.5'
                checked={assignedRoleIds.has(role.id)}
                disabled={toggleRole.isPending}
                onCheckedChange={checked => toggleRole.mutate({ userId: user.id, roleId: role.id, assign: checked })}
              />
              <label htmlFor={`role-${role.id}-permission-${role.id}`} className='cursor-pointer leading-snug'>
                {role.name}
              </label>
            </div>
          ))}
        </div>
        {toggleRole.isError && <p className='text-sm text-destructive'>Не удалось изменить роли, попробуйте снова</p>}
      </PopoverContent>
    </Popover>
  );
};
