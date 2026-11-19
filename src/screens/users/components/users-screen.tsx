'use client';

import { ScreenHeader } from '@/screens/dashboard';
import { useScreenSearch } from '@/shared/lib/hooks';
import { UsersIcon } from 'lucide-react';
import { UsersActions } from './users-actions';
import { UsersTable } from './users-table';

export const UsersScreen = () => {
  const { search, setSearch, debouncedSearch } = useScreenSearch();

  return (
    <>
      <ScreenHeader title='Пользователи' icon={UsersIcon} />
      <div className='flex flex-col gap-4'>
        <UsersActions search={search} onSearchChange={setSearch} />
        <UsersTable search={debouncedSearch} />
      </div>
    </>
  );
};
