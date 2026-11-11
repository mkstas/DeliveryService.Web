import { type FC } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { type User } from '@/common/api';
import { CheckboxList } from '@/common/components';
import { FormDialog } from '@/common/forms';
import { useRoles } from '@/modules/system-roles';
import { useToggleUserRole } from '../hooks/mutations';

type RolesDialogProps = {
  user: User;
};

export const RolesDialog: FC<RolesDialogProps> = ({ user }) => {
  const { data: roles } = useRoles();
  const toggleRole = useToggleUserRole();
  const assignedRoleIds = new Set(user.roles.map(role => role.id));

  return (
    <FormDialog
      trigger={{ text: 'Роли', trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title='Роли пользователя'
      description={user.emailAddress}
      contentClassName='sm:max-w-2xl w-full'
    >
      <CheckboxList
        items={roles ?? []}
        idPrefix={`user-${user.id}-role`}
        getId={role => role.id}
        getLabel={role => role.name}
        selectedIds={assignedRoleIds}
        disabled={toggleRole.isPending}
        onToggle={(role, checked) => toggleRole.mutate({ userId: user.id, roleId: role.id, assign: checked })}
      />
      {toggleRole.isError && <p className='text-sm text-destructive'>Не удалось изменить роли, попробуйте снова</p>}
    </FormDialog>
  );
};
