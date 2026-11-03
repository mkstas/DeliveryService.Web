import { MapPinIcon } from 'lucide-react';
import { SystemEstablishments } from '@/modules/dashboard';

export default function EstablishmentsPage() {
  return (
    <div className='flex flex-col gap-6 py-6'>
      <div className='flex items-center gap-3'>
        <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
          <MapPinIcon className='size-5' />
        </div>
        <h1 className='text-2xl font-bold tracking-tight'>Заведения</h1>
      </div>
      <SystemEstablishments />
    </div>
  );
}
