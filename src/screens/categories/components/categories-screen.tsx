'use client';

import { ScreenHeader } from '@/screens/dashboard';
import { useScreenSearch } from '@/shared/lib/hooks';
import { LayoutGridCirclesIcon } from 'lucide-react';
import { CategoriesActions } from './categories-actions';
import { CategoriesTable } from './categories-table';

export const CategoriesScreen = () => {
  const { search, setSearch, debouncedSearch } = useScreenSearch();

  return (
    <>
      <ScreenHeader title='Категории' icon={LayoutGridCirclesIcon} />
      <div className='flex flex-col gap-4'>
        <CategoriesActions search={search} onSearchChange={setSearch} />
        <CategoriesTable search={debouncedSearch} />
      </div>
    </>
  );
};
