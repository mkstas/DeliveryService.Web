'use client';

import { CreateNamedEntityDialog } from '@/features/crud';
import { SearchInput } from '@/shared/ui';
import { useCreateSpecification } from '../hooks/mutations';
import { specificationTexts } from '../texts';

type SpecificationsActionsProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const SpecificationsActions = ({ search, onSearchChange }: SpecificationsActionsProps) => {
  const createSpecification = useCreateSpecification();

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
      <SearchInput
        value={search}
        onChange={event => onSearchChange(event.target.value)}
        placeholder='Поиск по названию'
        aria-label='Поиск характеристики по названию'
      />
      <CreateNamedEntityDialog
        texts={specificationTexts}
        onSave={name => createSpecification.mutateAsync({ name })}
        triggerClassName='max-sm:w-full'
      />
    </div>
  );
};
