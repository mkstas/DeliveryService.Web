'use client';

import { PlusIcon } from 'lucide-react';
import { ActionsBar } from '@/common/crud';
import { FormDialog } from '@/common/forms';
import { useDishes } from '../hooks/queries';
import { DishForm } from './dish-form';

export const SystemDishesActions = () => {
  const { isLoading } = useDishes();

  return (
    <ActionsBar isLoading={isLoading}>
      <FormDialog
        trigger={{ icon: PlusIcon, text: 'Создать блюдо' }}
        title='Создание блюда'
        description='Укажите данные нового блюда'
        contentClassName='sm:max-w-lg'
      >
        {close => <DishForm onSuccess={close} />}
      </FormDialog>
    </ActionsBar>
  );
};
