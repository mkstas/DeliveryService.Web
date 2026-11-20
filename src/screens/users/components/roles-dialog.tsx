import { AssignmentDialog } from '@/features/crud';
import { useRoles } from '@/screens/roles';
import { type User } from '@/shared/api';
import { type FC } from 'react';
import { useToggleUserRole } from '../hooks/mutations';

type RolesDialogProps = {
  user: User;
};

export const RolesDialog: FC<RolesDialogProps> = ({ user }) => {
  const { data: roles } = useRoles();
  const toggleRole = useToggleUserRole();
  const assignedRoleIds = new Set(user.roles.map(role => role.id));

  return (
    <AssignmentDialog
      items={roles ?? []}
      idPrefix={`user-${user.id}-role`}
      getId={role => role.id}
      getLabel={role => role.name}
      selectedIds={assignedRoleIds}
      triggerText='Роли'
      title='Роли пользователя'
      description={user.emailAddress}
      cols={1}
      isPending={toggleRole.isPending}
      isError={toggleRole.isError}
      errorMessage='Не удалось изменить роли, попробуйте снова'
      onToggle={(role, checked) => toggleRole.mutate({ userId: user.id, roleId: role.id, assign: checked })}
    />
  );
};
