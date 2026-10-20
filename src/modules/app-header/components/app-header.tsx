import { FC } from 'react';
import { DonutIcon, LogInIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/common/components';
import { ROUTES } from '@/common/config';
import { cn } from '@/common/lib/utils';

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
          <Link href={ROUTES.LOGIN} className={cn(buttonVariants({ variant: 'outline' }))}>
            <LogInIcon className='size-4' />
            <span>Войти</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
