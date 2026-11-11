import { type FC } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { type Role } from '@/common/api';
import { CheckboxList } from '@/common/components';
import { FormDialog } from '@/common/forms';
import { useToggleRolePermission } from '../hooks/mutations';
import { usePermissions } from '../hooks/queries';

type PermissionsDialogProps = {
  role: Role;
};

export const PermissionsDialog: FC<PermissionsDialogProps> = ({ role }) => {
  const { data: permissions } = usePermissions();
  const togglePermission = useToggleRolePermission();
  const assignedPermissionIds = new Set(role.permissions.map(permission => permission.id));

  return (
    <FormDialog
      trigger={{ text: 'Разрешения', trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title='Разрешения роли'
      description={role.name}
      contentClassName='sm:max-w-2xl w-full h-96 overflow-y-auto'
    >
      <CheckboxList
        items={permissions ?? []}
        idPrefix={`role-${role.id}-permission`}
        getId={permission => permission.id}
        getLabel={permission => permission.displayName}
        selectedIds={assignedPermissionIds}
        disabled={togglePermission.isPending}
        onToggle={(permission, checked) =>
          togglePermission.mutate({ roleId: role.id, permissionId: permission.id, assign: checked })
        }
        className='grid gap-2 sm:grid-cols-2'
      />
      {togglePermission.isError && (
        <p className='text-sm text-destructive'>Не удалось изменить разрешение, попробуйте снова</p>
      )}
    </FormDialog>
  );
};
