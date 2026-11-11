'use client';

import { ChangeEvent, FC, useState } from 'react';
import { cn } from 'cn';
import { CameraIcon, CircleAlertIcon, LoaderCircleIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import { HttpError } from '@/common/api';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  buttonVariants,
  CardAction,
  CardDescription,
  CardTitle,
  Skeleton,
} from '@/common/components';
import { getUserImageUrl, ROUTES } from '@/common/config';
import { useLogout, useUserMe } from '@/modules/store-auth';
import { useUploadUserImage } from '../hooks/mutations';

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const getAvatarUploadErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError && error.serverMessage) {
    return error.serverMessage;
  }

  return 'Не удалось загрузить аватар, попробуйте снова';
};

export const StoreAccountProfile: FC = () => {
  const router = useRouter();
  const logout = useLogout();
  const uploadAvatar = useUploadUserImage();
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const { data: user, isLoading, isError } = useUserMe();

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-4 text-center'>
        <Skeleton className='size-20 rounded-full' />
        <div className='flex w-full min-w-0 flex-col items-center gap-2'>
          <Skeleton className='h-6 w-28 max-w-full' />
          <Skeleton className='h-5 w-48 max-w-full' />
        </div>
        <div className='grid w-full grid-cols-2 gap-2'>
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
        </div>
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

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    setAvatarError(null);

    if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
      setAvatarError('Поддерживаются изображения JPEG, PNG, WebP или GIF');
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      setAvatarError('Размер файла не должен превышать 5 МБ');
      return;
    }

    uploadAvatar.mutate(
      { file },
      {
        onError: error => setAvatarError(getAvatarUploadErrorMessage(error)),
      },
    );
  };

  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      <Avatar className='size-20 shadow-sm ring-4 ring-muted/60'>
        {user.imageUrl && <AvatarImage src={getUserImageUrl(user.imageUrl)} alt={`Аватар ${user.name}`} />}
        <AvatarFallback>
          <UserIcon className='size-8' />
        </AvatarFallback>
      </Avatar>
      <div className='flex min-w-0 flex-col gap-1'>
        <CardTitle className='truncate text-lg'>{user.name}</CardTitle>
        <CardDescription className='break-all'>{user.emailAddress}</CardDescription>
      </div>
      <CardAction className='flex w-full flex-col items-center gap-2'>
        <div className='grid w-full grid-cols-2 gap-2'>
          <label
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'default' }),
              'w-full cursor-pointer focus-within:ring-3 focus-within:ring-ring/50',
              uploadAvatar.isPending && 'pointer-events-none opacity-50',
            )}
            title='Загрузить фото'
          >
            {uploadAvatar.isPending ? <LoaderCircleIcon className='animate-spin' /> : <CameraIcon />}
            <span>Фото</span>
            <input
              type='file'
              accept='image/jpeg,image/png,image/webp,image/gif'
              className='sr-only'
              aria-label='Загрузить фото'
              disabled={uploadAvatar.isPending}
              onChange={handleAvatarChange}
            />
          </label>
          <Button className='w-full' variant='destructive' disabled={logout.isPending} onClick={handleLogout}>
            <LogOutIcon />
            <span>Выйти</span>
          </Button>
        </div>
        {avatarError && <p className='text-sm text-destructive'>{avatarError}</p>}
      </CardAction>
    </div>
  );
};
