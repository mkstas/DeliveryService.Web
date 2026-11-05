'use client';

import { FC, useState } from 'react';
import { LoaderCircleIcon, PencilIcon, UserIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { HttpError } from '@/common/api';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Skeleton,
} from '@/common/components';
import { User, useUserMe } from '@/modules/store-auth';
import { useUpdateUserBio } from '../hooks/useUpdateUserBio';

const accountBioFormSchema = z.object({
  name: z.string().trim().min(1, 'Имя не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type AccountBioFormSchema = z.infer<typeof accountBioFormSchema>;

type AccountBioFormProps = {
  user: User;
  onSubmit: () => void;
};

const getUpdateUserBioErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError && error.serverMessage) {
    return error.serverMessage;
  }

  return 'Ошибка сохранения имени, попробуйте снова позже';
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
      form.setFieldMeta('name', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      if (value.name === user.name) {
        onSubmit();
        return;
      }

      try {
        await userBio.mutateAsync(value);
        onSubmit();
      } catch (error) {
        form.setFieldMeta('name', prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message: getUpdateUserBioErrorMessage(error) }] },
        }));
      }
    },
  });

  return (
    <form
      className='flex flex-col gap-2 rounded-xl border bg-muted/20 p-3'
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name='name'
          listeners={{
            onChange: () => {
              form.setFieldMeta('name', prev => ({
                ...prev,
                errorMap: { ...prev.errorMap, onServer: undefined },
              }));
            },
          }}
        >
          {field => {
            const isError =
              field.state.meta.errors.length > 0 && (field.state.meta.isTouched || form.state.isSubmitted);

            return (
              <Field>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-start'>
                  <div className='flex min-w-0 flex-1 flex-col gap-2'>
                    <InputGroup>
                      <InputGroupAddon>
                        <UserIcon />
                      </InputGroupAddon>
                      <InputGroupInput
                        id='user_name'
                        type='text'
                        autoComplete='name'
                        aria-invalid={isError}
                        placeholder='Ваше имя'
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </InputGroup>
                    {isError && <FieldError errors={field.state.meta.errors.slice(0, 1)} />}
                  </div>
                  <div className='flex shrink-0 gap-2'>
                    <form.Subscribe
                      selector={state => ({
                        isSubmitting: state.isSubmitting,
                        name: state.values.name,
                      })}
                    >
                      {({ isSubmitting, name }) => (
                        <Button
                          type='submit'
                          className='flex-1 sm:flex-none'
                          disabled={isSubmitting || name.trim() === user.name}
                        >
                          {isSubmitting && <LoaderCircleIcon className='animate-spin' />}
                          Сохранить
                        </Button>
                      )}
                    </form.Subscribe>
                    <Button type='button' variant='secondary' className='flex-1 sm:flex-none' onClick={onSubmit}>
                      Отмена
                    </Button>
                  </div>
                </div>
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
    </form>
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
