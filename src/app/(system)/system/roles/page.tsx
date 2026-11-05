import { UserShieldIcon } from 'lucide-react';
import { DashboardHeader } from '@/modules/dashboard';
import { SystemRolesActions, SystemRolesTable } from '@/modules/system-roles';

export default function RolesPage() {
  return (
    <>
      <DashboardHeader title='Роли пользователей' icon={UserShieldIcon} />
      <div className='flex flex-col gap-4'>
        <SystemRolesActions />
        <SystemRolesTable />
      </div>
    </>
  );
}
