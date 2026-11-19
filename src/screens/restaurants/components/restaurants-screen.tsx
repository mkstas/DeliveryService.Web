'use client';

import { ScreenHeader } from '@/screens/dashboard';
import { useScreenSearch } from '@/shared/lib/hooks';
import { MapPinIcon } from 'lucide-react';
import { RestaurantsActions } from './restaurants-actions';
import { RestaurantsTable } from './restaurants-table';

export const RestaurantsScreen = () => {
  const { search, setSearch, debouncedSearch } = useScreenSearch();

  return (
    <>
      <ScreenHeader title='Рестораны' icon={MapPinIcon} />
      <div className='flex flex-col gap-4'>
        <RestaurantsActions search={search} onSearchChange={setSearch} />
        <RestaurantsTable search={debouncedSearch} />
      </div>
    </>
  );
};
