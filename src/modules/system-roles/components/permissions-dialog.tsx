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
import { Role } from '@/modules/store-auth';
import { usePermissions } from '../hooks/usePermissions';
import { useToggleRolePermission } from '../hooks/useToggleRolePermission';

type PermissionsDialogProps = {
  role: Role;
};

export const PermissionsDialog: FC<PermissionsDialogProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: permissions } = usePermissions();
  const togglePermission = useToggleRolePermission();
  const assignedPermissionIds = new Set(role.permissions.map(permission => permission.id));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant='secondary' />}>
        Разрешения <ChevronDownIcon className='text-muted-foreground' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl w-full h-96 overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Разрешения роли</DialogTitle>
          <DialogDescription>{role.name}</DialogDescription>
        </DialogHeader>
        <div className='grid sm:grid-cols-2 gap-2'>
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
          {togglePermission.isError && (
            <p className='text-sm text-destructive'>Не удалось изменить разрешение, попробуйте снова</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
