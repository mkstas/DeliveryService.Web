import { UserShieldIcon } from 'lucide-react';
import { SystemRoles } from '@/modules/dashboard';

export default function Roles() {
  return (
    <div className='flex flex-col gap-6 py-6'>
      <div className='flex items-center gap-3'>
        <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
          <UserShieldIcon className='size-5' />
        </div>
        <h1 className='text-2xl font-bold tracking-tight'>Роли в системе</h1>
      </div>
      <SystemRoles />
    </div>
  );
}
