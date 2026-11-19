'use client';

import { FormDialog } from '@/features/form';
import type { Ingredient } from '@/shared/api';
import { type FC } from 'react';
import { PencilIcon } from 'lucide-react';
import { IngredientNameForm } from './ingredient-name-form';

type EditIngredientDialogProps = {
  ingredient: Ingredient;
  onSave: (name: string) => Promise<void>;
};

export const EditIngredientDialog: FC<EditIngredientDialogProps> = ({ ingredient, onSave }) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать ингредиент' }}
      title='Редактирование ингредиента'
      description='Измените название ингредиента'
    >
      {close => (
        <IngredientNameForm initialName={ingredient.name} submitLabel='Сохранить' onSubmit={onSave} onSuccess={close} />
      )}
    </FormDialog>
  );
};
