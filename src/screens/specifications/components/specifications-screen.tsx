'use client';

import { ScreenHeader } from '@/screens/dashboard';
import { useScreenSearch } from '@/shared/lib/hooks';
import { ClipboardPenLineIcon } from 'lucide-react';
import { SpecificationsActions } from './specifications-actions';
import { SpecificationsTable } from './specifications-table';

export const SpecificationsScreen = () => {
  const { search, setSearch, debouncedSearch } = useScreenSearch();

  return (
    <>
      <ScreenHeader title='Характеристики' icon={ClipboardPenLineIcon} />
      <div className='flex flex-col gap-4'>
        <SpecificationsActions search={search} onSearchChange={setSearch} />
        <SpecificationsTable search={debouncedSearch} />
      </div>
    </>
  );
};
