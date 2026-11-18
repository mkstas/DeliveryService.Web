'use client';

import { PlusIcon } from 'lucide-react';
import { ActionsBar } from '@/common/crud';
import { FormDialog } from '@/common/forms';
import { useUsers } from '../hooks/queries';
import { CreateUserForm } from './create-user-form';

export const SystemUsersActions = () => {
  const { isLoading } = useUsers();

  return (
    <ActionsBar isLoading={isLoading}>
      <FormDialog
        trigger={{ icon: PlusIcon, text: 'Создать пользователя' }}
        title='Создание пользователя'
        description='Укажите данные нового пользователя'
      >
        {close => <CreateUserForm onSuccess={close} />}
      </FormDialog>
    </ActionsBar>
  );
};
