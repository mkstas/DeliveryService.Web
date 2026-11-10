import { FC, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components';
import { User } from '@/modules/store-auth';
import { useRoles } from '@/modules/system-roles';
import { useToggleUserRole } from '../hooks/useToggleUserRole';

type RolesDialogProps = {
  user: User;
};

export const RolesDialog: FC<RolesDialogProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: roles } = useRoles();
  const toggleRole = useToggleUserRole();
  const assignedRoleIds = new Set(user.roles.map(role => role.id));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant='secondary' />}>
        Роли <ChevronDownIcon className='text-muted-foreground' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl w-full'>
        <DialogHeader>
          <DialogTitle>Роли пользователя</DialogTitle>
          <DialogDescription>{user.emailAddress}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-2'>
          {roles?.map(role => (
            <div key={role.id} className='flex items-start gap-2'>
              <Checkbox
                id={`user-${user.id}-role-${role.id}`}
                className='mt-0.5'
                checked={assignedRoleIds.has(role.id)}
                disabled={toggleRole.isPending}
                onCheckedChange={checked => toggleRole.mutate({ userId: user.id, roleId: role.id, assign: checked })}
              />
              <label htmlFor={`user-${user.id}-role-${role.id}`} className='cursor-pointer leading-snug'>
                {role.name}
              </label>
            </div>
          ))}
          {toggleRole.isError && <p className='text-sm text-destructive'>Не удалось изменить роли, попробуйте снова</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};
