import { UsersIcon } from 'lucide-react';
import { DashboardHeader } from '@/modules/dashboard';
import { SystemUsersActions, SystemUsersTable } from '@/modules/system-users';

export default function UsersPage() {
  return (
    <>
      <DashboardHeader title='Пользователи' icon={UsersIcon} />
      <div className='flex flex-col gap-4'>
        <SystemUsersActions />
        <SystemUsersTable />
      </div>
    </>
  );
}
