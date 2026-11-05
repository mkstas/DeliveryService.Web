import { FC } from 'react';
import { DonutIcon } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/common/config';
import { HaderAuthActions } from './header-auth-actions';

export const StoreHeader: FC = () => {
  return (
    <header className='bg-background py-4 border-b'>
      <div className='container mx-auto flex justify-between px-2 items-center'>
        <Link href={ROUTES.STORE} className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-full bg-sidebar-primary text-white'>
            <DonutIcon className='size-5' />
          </div>
          <span className='font-bold uppercase'>Доставички</span>
        </Link>
        <div className='flex items-center'>
          <HaderAuthActions />
        </div>
      </div>
    </header>
  );
};
