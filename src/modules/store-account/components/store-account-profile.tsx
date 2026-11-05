'use client';

import { FC } from 'react';
import { CircleAlertIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  CardAction,
  CardDescription,
  CardTitle,
  Skeleton,
} from '@/common/components';
import { API_URL, ROUTES } from '@/common/config';
import { useLogout, useUserMe } from '@/modules/store-auth';

export const StoreAccountProfile: FC = () => {
  const router = useRouter();
  const logout = useLogout();
  const { data: user, isLoading, isError } = useUserMe();

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-4 text-center'>
        <Skeleton className='size-20 rounded-full' />
        <div className='flex w-full min-w-0 flex-col items-center gap-2'>
          <Skeleton className='h-6 w-28 max-w-full' />
          <Skeleton className='h-5 w-48 max-w-full' />
        </div>
        <Skeleton className='h-9 w-24 rounded-4xl' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col items-center gap-3 py-4 text-center'>
        <div className='flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive'>
          <CircleAlertIcon className='size-6' />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='font-medium'>Не удалось загрузить профиль</p>
          <p className='text-sm text-muted-foreground'>Попробуйте обновить страницу.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return notFound();
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => router.replace(ROUTES.STORE),
    });
  };

  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      <Avatar className='size-20 shadow-sm ring-4 ring-muted/60'>
        {user.imageUrl && <AvatarImage src={`${API_URL}/static/${user.imageUrl}`} alt={`Аватар ${user.name}`} />}
        <AvatarFallback>
          <UserIcon className='size-8' />
        </AvatarFallback>
      </Avatar>
      <div className='flex min-w-0 flex-col gap-1'>
        <CardTitle className='truncate text-lg'>{user.name}</CardTitle>
        <CardDescription className='break-all'>{user.emailAddress}</CardDescription>
      </div>
      <CardAction className='flex w-full flex-col items-center justify-center gap-2'>
        <Button variant='destructive' disabled={logout.isPending} onClick={handleLogout}>
          <LogOutIcon />
          <span>Выйти</span>
        </Button>
        {logout.isError && <p className='text-sm text-destructive'>Не удалось выйти, попробуйте снова</p>}
      </CardAction>
    </div>
  );
};
