'use client';

import { FormDialog } from '@/features/form';
import { SearchInput } from '@/shared/ui';
import { PlusIcon } from 'lucide-react';
import { useAddMyRestaurantIngredient } from '../hooks/mutations';
import { IngredientNameForm } from './ingredient-name-form';

type IngredientsActionsProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const IngredientsActions = ({ search, onSearchChange }: IngredientsActionsProps) => {
  const addIngredient = useAddMyRestaurantIngredient();

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
      <SearchInput
        value={search}
        onChange={event => onSearchChange(event.target.value)}
        placeholder='Поиск по названию'
        aria-label='Поиск ингредиента по названию'
      />
      <FormDialog
        trigger={{ icon: PlusIcon, text: 'Добавить ингредиент', className: 'max-sm:w-full' }}
        title='Добавление ингредиента'
        description='Укажите название нового ингредиента'
      >
        {close => (
          <IngredientNameForm
            submitLabel='Добавить'
            onSubmit={name => addIngredient.mutateAsync(name)}
            onSuccess={close}
          />
        )}
      </FormDialog>
    </div>
  );
};
