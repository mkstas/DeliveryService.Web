import { FC } from 'react';
import { DonutIcon } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/common/config';
import { AuthActions } from './auth-actions';

export const AppHeader: FC = () => {
  return (
    <header className='bg-background py-4 border-b'>
      <div className='container mx-auto flex justify-between px-2 items-center'>
        <Link href={ROUTES.STORE} className='flex items-center gap-3'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground'>
            <DonutIcon />
          </div>
          <div>
            <span className='font-bold uppercase'>Доставички</span>
          </div>
        </Link>
        <div className='flex items-center'>
          <AuthActions />
        </div>
      </div>
    </header>
  );
};
