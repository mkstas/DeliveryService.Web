'use client';

import { CreateNamedEntityDialog } from '@/features/crud';
import { SearchInput } from '@/shared/ui';
import { useCreateCategory } from '../hooks/mutations';
import { categoryTexts } from '../texts';

type CategoriesActionsProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const CategoriesActions = ({ search, onSearchChange }: CategoriesActionsProps) => {
  const createCategory = useCreateCategory();

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
      <SearchInput
        value={search}
        onChange={event => onSearchChange(event.target.value)}
        placeholder='Поиск по названию'
        aria-label='Поиск категории по названию'
      />
      <CreateNamedEntityDialog
        texts={categoryTexts}
        onSave={name => createCategory.mutateAsync({ name })}
        triggerClassName='max-sm:w-full'
      />
    </div>
  );
};
