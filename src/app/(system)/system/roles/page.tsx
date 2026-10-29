import { SystemRoles } from '@/modules/dashboard';

export default function Roles() {
  return (
    <div className='flex flex-col gap-4 py-4'>
      <h1 className='text-xl font-bold'>Роли в системе</h1>
      <SystemRoles />
    </div>
  );
}
