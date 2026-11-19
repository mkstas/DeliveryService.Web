'use client';

import { ScreenHeader } from '@/screens/dashboard';
import { useScreenSearch } from '@/shared/lib/hooks';
import { SoupIcon } from 'lucide-react';
import { DishesActions } from './dishes-actions';
import { DishesTable } from './dishes-table';

export const DishesScreen = () => {
  const { search, setSearch, debouncedSearch } = useScreenSearch();

  return (
    <>
      <ScreenHeader title='Блюда' icon={SoupIcon} />
      <div className='flex flex-col gap-4'>
        <DishesActions search={search} onSearchChange={setSearch} />
        <DishesTable search={debouncedSearch} />
      </div>
    </>
  );
};
