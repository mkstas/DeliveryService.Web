import { UsersIcon } from 'lucide-react';
import { SystemUsers } from '@/modules/dashboard/components/system-users';

export default function UsersPage() {
  return (
    <div className='flex flex-col gap-6 py-6'>
      <div className='flex items-center gap-3'>
        <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
          <UsersIcon className='size-5' />
        </div>
        <h1 className='text-2xl font-bold tracking-tight'>Пользователи</h1>
      </div>
      <SystemUsers />
    </div>
  );
}
