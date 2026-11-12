'use client';

import { type FC } from 'react';
import { PlusIcon } from 'lucide-react';
import { FormDialog } from '@/common/forms';
import { IngredientForm } from './ingredient-form';

export const CreateIngredientDialog: FC = () => {
  return (
    <FormDialog
      trigger={{ icon: PlusIcon, text: 'Создать ингредиент' }}
      title='Создание ингредиента'
      description='Укажите название и выберите заведение для нового ингредиента'
    >
      {close => <IngredientForm onSuccess={close} />}
    </FormDialog>
  );
};
