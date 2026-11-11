'use client';

import { FC } from 'react';
import { cn } from 'cn';
import { LogInIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage, buttonVariants, Skeleton } from '@/common/components';
import { getUserImageUrl, ROUTES } from '@/common/config';
import { useUserMe } from '@/modules/store-auth';

export const HaderAuthActions: FC = () => {
  const { data: user, isLoading } = useUserMe();

  if (isLoading) {
    return <Skeleton className='h-7 w-24 rounded-lg' />;
  }

  if (!user) {
    return (
      <Link href={ROUTES.LOGIN} className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'pl-0')}>
        <Avatar className='-ml-1 size-8 shrink-0'>
          <AvatarFallback>
            <LogInIcon className='text-accent-foreground' />
          </AvatarFallback>
        </Avatar>
        <span>Войти</span>
      </Link>
    );
  }

  return (
    <Link
      href={ROUTES.ACCOUNT}
      title={user.name}
      className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'max-w-32 pl-0')}
    >
      <Avatar className='-ml-1 size-8 shrink-0'>
        {user?.imageUrl && <AvatarImage src={getUserImageUrl(user.imageUrl)} alt={`Аватар ${user.name}`} />}
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <span className='truncate'>{user.name}</span>
    </Link>
  );
};
