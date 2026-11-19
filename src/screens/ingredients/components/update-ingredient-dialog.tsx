'use client';

import { FormDialog } from '@/features/form';
import { type FC } from 'react';
import { PencilIcon } from 'lucide-react';
import type { IngredientWithRestaurant } from '../hooks/queries';
import { IngredientForm } from './ingredient-form';

type UpdateIngredientDialogProps = {
  ingredient: IngredientWithRestaurant;
};

export const UpdateIngredientDialog: FC<UpdateIngredientDialogProps> = ({ ingredient }) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать ингредиент' }}
      title='Редактирование ингредиента'
      description='Измените данные ингредиента'
    >
      {close => <IngredientForm ingredient={ingredient} onSuccess={close} />}
    </FormDialog>
  );
};
