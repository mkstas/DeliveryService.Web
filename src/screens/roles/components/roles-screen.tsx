'use client';

import { ScreenHeader } from '@/screens/dashboard';
import { UserShieldIcon } from 'lucide-react';
import { RolesActions } from './roles-actions';
import { RolesTable } from './roles-table';

export const RolesScreen = () => {
  return (
    <>
      <ScreenHeader title='Роли' icon={UserShieldIcon} />
      <div className='flex flex-col gap-4'>
        <RolesActions />
        <RolesTable />
      </div>
    </>
  );
};
