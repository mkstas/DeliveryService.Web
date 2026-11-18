import { type FC } from 'react';
import { type Role } from '@/common/api';
import { AssignmentDialog } from '@/common/crud';
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
    <AssignmentDialog
      items={permissions ?? []}
      idPrefix={`role-${role.id}-permission`}
      getId={permission => permission.id}
      getLabel={permission => permission.displayName}
      selectedIds={assignedPermissionIds}
      triggerText='Разрешения'
      title='Разрешения роли'
      description={role.name}
      contentClassName='sm:max-w-2xl w-full h-96 overflow-y-auto'
      isPending={togglePermission.isPending}
      isError={togglePermission.isError}
      errorMessage='Не удалось изменить разрешение, попробуйте снова'
      onToggle={(permission, checked) =>
        togglePermission.mutate({ roleId: role.id, permissionId: permission.id, assign: checked })
      }
    />
  );
};
