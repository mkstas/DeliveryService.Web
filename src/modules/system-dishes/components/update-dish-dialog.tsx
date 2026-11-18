'use client';

import { PencilIcon } from 'lucide-react';
import type { Dish } from '@/common/api';
import { FormDialog } from '@/common/forms';
import { DishForm } from './dish-form';

type UpdateDishDialogProps = {
  dish: Dish;
};

export const UpdateDishDialog = ({ dish }: UpdateDishDialogProps) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать блюдо' }}
      title='Обновление блюда'
      description={dish.name}
      contentClassName='sm:max-w-lg'
    >
      {close => <DishForm dish={dish} onSuccess={close} />}
    </FormDialog>
  );
};
