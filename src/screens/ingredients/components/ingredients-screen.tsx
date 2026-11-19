'use client';

import { ScreenHeader } from '@/screens/dashboard';
import { useScreenSearch } from '@/shared/lib/hooks';
import { LeafyGreenIcon } from 'lucide-react';
import { IngredientsActions } from './ingredients-actions';
import { IngredientsTable } from './ingredients-table';

export const IngredientsScreen = () => {
  const { search, setSearch, debouncedSearch } = useScreenSearch();

  return (
    <>
      <ScreenHeader title='Ингредиенты' icon={LeafyGreenIcon} />
      <div className='flex flex-col gap-4'>
        <IngredientsActions search={search} onSearchChange={setSearch} />
        <IngredientsTable search={debouncedSearch} />
      </div>
    </>
  );
};
