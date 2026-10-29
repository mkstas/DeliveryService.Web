'use client';

import { FC } from 'react';
import { cn } from 'cn';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, buttonVariants, Skeleton } from '@/common/components';
import { ROUTES } from '@/common/config';
import { useLogout, useSession } from '@/modules/auth';

export const AuthActions: FC = () => {
  const router = useRouter();
  const { data: user, isPending } = useSession();
  const logout = useLogout();

  if (isPending) {
    return <Skeleton className='w-24 h-9 rounded-full' />;
  }

  if (!user) {
    return (
      <Link href={ROUTES.LOGIN} className={cn(buttonVariants({ variant: 'outline' }))}>
        <LogInIcon className='size-4' />
        <span>Войти</span>
      </Link>
    );
  }

  return (
    <Button
      variant={'outline'}
      onClick={() =>
        logout.mutate(undefined, {
          onSuccess: () => router.push(ROUTES.STORE),
        })
      }
    >
      <LogOutIcon />
      <span>Выйти</span>
    </Button>
  );
};
