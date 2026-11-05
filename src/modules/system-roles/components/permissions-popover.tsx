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
import { Role } from '@/modules/store-auth';
import { usePermissions } from '../hooks/usePermissions';
import { useToggleRolePermission } from '../hooks/useToggleRolePermission';

type PermissionsPopoverProps = {
  role: Role;
};

export const PermissionsPopover: FC<PermissionsPopoverProps> = ({ role }) => {
  const { data: permissions } = usePermissions();
  const togglePermission = useToggleRolePermission();
  const assignedPermissionIds = new Set(role.permissions.map(permission => permission.id));

  return (
    <Popover>
      <PopoverTrigger render={<Button variant='secondary' size='xs' />}>
        Назначить разрешения <ChevronDownIcon className='text-muted-foreground' />
      </PopoverTrigger>
      <PopoverContent className='md:w-lg overflow-y-auto max-h-(--available-height)'>
        <PopoverHeader>
          <PopoverTitle>Разрешения роли</PopoverTitle>
          <PopoverDescription>{role.name}</PopoverDescription>
        </PopoverHeader>
        <div className='grid min-h-0 items-start md:grid-cols-2 gap-2'>
          {permissions?.map(permission => (
            <div key={permission.id} className='flex items-start gap-2'>
              <Checkbox
                id={`role-${role.id}-permission-${permission.id}`}
                className='mt-0.5'
                checked={assignedPermissionIds.has(permission.id)}
                disabled={togglePermission.isPending}
                onCheckedChange={checked =>
                  togglePermission.mutate({ roleId: role.id, permissionId: permission.id, assign: checked })
                }
              />
              <label htmlFor={`role-${role.id}-permission-${permission.id}`} className='cursor-pointer leading-snug'>
                {permission.displayName}
              </label>
            </div>
          ))}
        </div>
        {togglePermission.isError && (
          <p className='text-sm text-destructive'>Не удалось изменить разрешение, попробуйте снова</p>
        )}
      </PopoverContent>
    </Popover>
  );
};
