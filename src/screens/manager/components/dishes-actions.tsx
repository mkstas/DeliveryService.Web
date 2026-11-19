'use client';

import { FormDialog } from '@/features/form';
import { SearchInput } from '@/shared/ui';
import { PlusIcon } from 'lucide-react';
import { CreateDishForm } from './create-dish-form';

type DishesActionsProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const DishesActions = ({ search, onSearchChange }: DishesActionsProps) => {
  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
      <SearchInput
        value={search}
        onChange={event => onSearchChange(event.target.value)}
        placeholder='Поиск по названию'
        aria-label='Поиск блюда по названию'
      />
      <FormDialog
        trigger={{ icon: PlusIcon, text: 'Создать блюдо', className: 'max-sm:w-full' }}
        title='Создание блюда'
        description='Укажите данные нового блюда вашего заведения'
        contentClassName='sm:max-w-lg'
      >
        {close => <CreateDishForm onSuccess={close} />}
      </FormDialog>
    </div>
  );
};
