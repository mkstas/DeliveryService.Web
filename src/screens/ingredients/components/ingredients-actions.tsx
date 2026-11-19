'use client';

import { SearchInput } from '@/shared/ui';
import { CreateIngredientDialog } from './create-ingredient-dialog';

type IngredientsActionsProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const IngredientsActions = ({ search, onSearchChange }: IngredientsActionsProps) => {
  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
      <SearchInput
        value={search}
        onChange={event => onSearchChange(event.target.value)}
        placeholder='Поиск по названию'
        aria-label='Поиск ингредиента по названию'
      />
      <CreateIngredientDialog />
    </div>
  );
};
