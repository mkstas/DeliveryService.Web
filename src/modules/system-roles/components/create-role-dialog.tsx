'use client';

import { type FC } from 'react';
import { PlusIcon } from 'lucide-react';
import { FormDialog } from '@/common/forms';
import { RoleForm } from './role-form';

export const CreateRoleDialog: FC = () => {
  return (
    <FormDialog
      trigger={{ icon: PlusIcon, text: 'Создать роль' }}
      title='Создание роли'
      description='Укажите название новой роли'
    >
      {close => <RoleForm onSuccess={close} />}
    </FormDialog>
  );
};
