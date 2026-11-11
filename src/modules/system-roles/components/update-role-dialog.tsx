'use client';

import { type FC } from 'react';
import { PencilIcon } from 'lucide-react';
import { type Role } from '@/common/api';
import { FormDialog } from '@/common/forms';
import { RoleForm } from './role-form';

type UpdateRoleDialogProps = {
  role: Role;
};

export const UpdateRoleDialog: FC<UpdateRoleDialogProps> = ({ role }) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать роль' }}
      title='Обновление роли'
      description='Измените название роли'
    >
      {close => <RoleForm role={role} onSuccess={close} />}
    </FormDialog>
  );
};
