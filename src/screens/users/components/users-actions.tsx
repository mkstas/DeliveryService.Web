'use client';

import { FormDialog } from '@/features/form';
import { SearchInput } from '@/shared/ui';
import { PlusIcon } from 'lucide-react';
import { CreateUserForm } from './create-user-form';

type UsersActionsProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const UsersActions = ({ search, onSearchChange }: UsersActionsProps) => {
  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
      <SearchInput
        value={search}
        onChange={event => onSearchChange(event.target.value)}
        placeholder='Поиск по email'
        aria-label='Поиск пользователя по email'
      />
      <FormDialog
        trigger={{ icon: PlusIcon, text: 'Создать пользователя', className: 'max-sm:w-full' }}
        title='Создание пользователя'
        description='Укажите данные нового пользователя'
      >
        {close => <CreateUserForm onSuccess={close} />}
      </FormDialog>
    </div>
  );
};
