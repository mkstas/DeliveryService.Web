'use client';

import { getUserImageUrl, ROUTES } from '@/shared/config';
import { useUserMe } from '@/shared/lib/auth/hooks';
import { dashboardAccessRule, systemAccessRule } from '@/shared/lib/auth/route-guard';
import { Avatar, AvatarFallback, AvatarImage, buttonVariants, Skeleton } from '@/shared/ui';
import { FC } from 'react';
import { cn } from 'cn';
import { LayoutDashboardIcon, LogInIcon, ServerIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

export const HaderAuthActions: FC = () => {
  const { data: user, isLoading } = useUserMe();

  if (isLoading) {
    return <Skeleton className='h-7 w-24 rounded-lg' />;
  }

  if (!user) {
    return (
      <Link href={ROUTES.LOGIN} className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'pl-0')}>
        <Avatar className='size-8 shrink-0'>
          <AvatarFallback>
            <LogInIcon className='text-accent-foreground' />
          </AvatarFallback>
        </Avatar>
        <span>Войти</span>
      </Link>
    );
  }

  const canOpenDashboard = dashboardAccessRule.allow(user.roles);
  const canOpenSystem = systemAccessRule.allow(user.roles);

  return (
    <div className='flex items-center gap-2'>
      {canOpenDashboard && (
        <Link href={ROUTES.DASHBOARD} className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}>
          <LayoutDashboardIcon />
          <span>Мой Ресторан</span>
        </Link>
      )}
      {canOpenSystem && (
        <Link href={ROUTES.SYSTEM} className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}>
          <ServerIcon />
          <span>Система</span>
        </Link>
      )}
      <Link
        href={ROUTES.ACCOUNT}
        title={user.name}
        className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'max-w-32 pl-0')}
      >
        <Avatar className='size-8 shrink-0'>
          {user?.imageUrl && <AvatarImage src={getUserImageUrl(user.imageUrl)} alt={`Аватар ${user.name}`} />}
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        <span className='truncate'>{user.name}</span>
      </Link>
    </div>
  );
};
