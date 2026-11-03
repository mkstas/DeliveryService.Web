'use client';

import { FC, useState } from 'react';
import { cn } from 'cn';
import { LogInIcon, PencilIcon, ShieldAlertIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/common/components';
import { API_URL, ROUTES } from '@/common/config';
import { useSession } from '@/modules/auth';
import { AccountEmailForm } from './account-email-form';
import { AccountNameForm } from './account-name-form';

type EditingField = 'name' | 'emailAddress';

export const AccountProfile: FC = () => {
  const [editingField, setEditingField] = useState<EditingField | null>(null);
  const { data: user, isPending, isError, refetch } = useSession();

  const toggleEditingField = (field: EditingField) => {
    setEditingField(prev => (prev === field ? null : field));
  };

  if (isPending) {
    return (
      <Card className='max-w-2xl'>
        <CardHeader>
          <div className='flex items-center gap-4'>
            <Skeleton className='size-14 shrink-0 rounded-full' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-6 w-40' />
              <Skeleton className='h-4 w-52' />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-5 w-40' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <div className='flex max-w-2xl flex-col items-center justify-center gap-4 rounded-2xl border border-dashed px-6 py-16 text-center'>
        <div className='flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive'>
          <ShieldAlertIcon className='size-6' />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='font-medium'>Не удалось загрузить профиль</p>
          <p className='text-sm text-muted-foreground'>Попробуйте повторить запрос.</p>
        </div>
        <Button variant='outline' onClick={() => refetch()}>
          Повторить
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex max-w-2xl flex-col items-center justify-center gap-4 rounded-2xl border border-dashed px-6 py-16 text-center'>
        <div className='flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground'>
          <UserIcon className='size-6' />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='font-medium'>Войдите в аккаунт</p>
          <p className='text-sm text-muted-foreground'>Чтобы просмотреть информацию о профиле.</p>
        </div>
        <Link href={ROUTES.LOGIN} className={cn(buttonVariants())}>
          <LogInIcon />
          Войти
        </Link>
      </div>
    );
  }

  return (
    <Card className='max-w-2xl'>
      <CardHeader>
        <div className='flex items-center gap-4'>
          <Avatar className='size-14'>
            {user.imageUrl && <AvatarImage src={`${API_URL}/static/${user.imageUrl}`} alt={`Avatar ${user.name}`} />}
            <AvatarFallback>
              <UserIcon className='size-6' />
            </AvatarFallback>
          </Avatar>
          <div className='flex min-w-0 flex-col gap-1'>
            <CardTitle className='truncate text-xl'>{user.name}</CardTitle>
            <CardDescription className='truncate'>{user.emailAddress}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm text-muted-foreground'>Имя</span>
              <Button
                variant='ghost'
                size='icon-sm'
                aria-label='Редактировать имя'
                aria-expanded={editingField === 'name'}
                title='Редактировать имя'
                onClick={() => toggleEditingField('name')}
              >
                <PencilIcon />
              </Button>
            </div>
            {editingField === 'name' ? (
              <AccountNameForm user={user} onSuccess={() => setEditingField(null)} />
            ) : (
              <p className='font-medium'>{user.name}</p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm text-muted-foreground'>Электронная почта</span>
              <Button
                variant='ghost'
                size='icon-sm'
                aria-label='Редактировать электронную почту'
                aria-expanded={editingField === 'emailAddress'}
                title='Редактировать электронную почту'
                onClick={() => toggleEditingField('emailAddress')}
              >
                <PencilIcon />
              </Button>
            </div>
            {editingField === 'emailAddress' ? (
              <AccountEmailForm user={user} onSuccess={() => setEditingField(null)} />
            ) : (
              <p className='truncate font-medium'>{user.emailAddress}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
