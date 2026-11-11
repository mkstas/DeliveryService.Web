'use client';

import { type FC, useState } from 'react';
import { PencilIcon, UserIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { type User } from '@/common/api';
import { Button, FieldGroup, Skeleton } from '@/common/components';
import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/common/forms';
import { useUserMe } from '@/modules/store-auth';
import { useUpdateUserBio } from '../hooks/mutations';

const accountBioFormSchema = z.object({
  name: z.string().trim().min(1, 'Имя не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type AccountBioFormSchema = z.infer<typeof accountBioFormSchema>;

type AccountBioFormProps = {
  user: User;
  onSubmit: () => void;
};

const AccountBioForm: FC<AccountBioFormProps> = ({ user, onSubmit }) => {
  const userBio = useUpdateUserBio();

  const form = useForm({
    defaultValues: {
      name: user.name,
    } as AccountBioFormSchema,
    validators: {
      onChange: accountBioFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      if (value.name === user.name) {
        onSubmit();
        return;
      }

      try {
        await userBio.mutateAsync(value);
        onSubmit();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(error, {}, 'Ошибка сохранения имени, попробуйте снова позже'),
        );
      }
    },
  });

  return (
    <FormShell form={form} className='flex flex-col gap-2 rounded-xl border bg-muted/20 p-3'>
      <FieldGroup>
        <TextField
          form={form}
          name='name'
          icon={UserIcon}
          autoComplete='name'
          placeholder='Ваше имя'
          actions={
            <>
              <SubmitButton
                form={form}
                className='flex-1 sm:flex-none'
                withSpinner
                disabled={values => values.name.trim() === user.name}
              >
                Сохранить
              </SubmitButton>
              <Button type='button' variant='secondary' className='flex-1 sm:flex-none' onClick={onSubmit}>
                Отмена
              </Button>
            </>
          }
        />
      </FieldGroup>
    </FormShell>
  );
};

export const StoreAccountBio: FC = () => {
  const { data: user, isLoading } = useUserMe();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-3 w-12' />
        <Skeleton className='h-5 w-40' />
      </div>
    );
  }

  if (!user) {
    return notFound();
  }

  return (
    <div className='flex items-center justify-between gap-3'>
      <div className='flex w-full min-w-0 flex-col gap-1'>
        <span className='text-xs font-medium text-muted-foreground'>Имя</span>
        {isEdit ? (
          <AccountBioForm user={user} onSubmit={() => setIsEdit(false)} />
        ) : (
          <span className='truncate font-medium'>{user.name}</span>
        )}
      </div>
      {!isEdit && (
        <Button
          variant='ghost'
          size='icon-sm'
          aria-label='Редактировать имя'
          title='Редактировать имя'
          onClick={() => setIsEdit(true)}
        >
          <PencilIcon />
        </Button>
      )}
    </div>
  );
};
