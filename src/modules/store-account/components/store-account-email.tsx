'use client';

import { type FC, useState } from 'react';
import { MailIcon, PencilIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { type User } from '@/common/api';
import { Button, FieldGroup, Skeleton } from '@/common/components';
import {
  clearServerErrors,
  CodeField,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/common/forms';
import { useUserMe } from '@/modules/store-auth';
import { useConfirmUserEmail, useResendUserEmail, useUpdateUserEmail } from '../hooks/mutations';

const accountEmailFormSchema = z.object({
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
});

const confirmEmailFormSchema = z.object({
  code: z.string().trim().length(6, 'Код состоит из шести символов'),
});

type AccountEmailFormSchema = z.infer<typeof accountEmailFormSchema>;
type ConfirmEmailFormSchema = z.infer<typeof confirmEmailFormSchema>;

type EmailStep = 'email' | 'confirm';

type AccountEmailFormProps = {
  user: User;
  onSubmit: () => void;
};

const AccountEmailForm: FC<AccountEmailFormProps> = ({ user, onSubmit }) => {
  const updateEmail = useUpdateUserEmail();
  const confirmEmail = useConfirmUserEmail();
  const resendEmail = useResendUserEmail();

  const [step, setStep] = useState<EmailStep>('email');
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const emailForm = useForm({
    defaultValues: {
      emailAddress: user.emailAddress,
    } as AccountEmailFormSchema,
    validators: {
      onChange: accountEmailFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(emailForm, ['emailAddress']);

      const emailAddress = value.emailAddress.trim();

      if (emailAddress === user.emailAddress) {
        return;
      }

      try {
        await updateEmail.mutateAsync({ emailAddress });
        setPendingEmail(emailAddress);
        setStep('confirm');
      } catch (error) {
        setServerError(
          emailForm,
          'emailAddress',
          getServerErrorMessage(
            error,
            { 409: 'Такой адрес эл. почты уже занят' },
            'Ошибка сохранения эл. почты, попробуйте снова позже',
          ),
        );
      }
    },
  });

  const codeForm = useForm({
    defaultValues: {
      code: '',
    } as ConfirmEmailFormSchema,
    validators: {
      onChange: confirmEmailFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(codeForm, ['code']);

      if (!pendingEmail) {
        return;
      }

      try {
        await confirmEmail.mutateAsync({ code: value.code.trim(), emailAddress: pendingEmail });
        onSubmit();
      } catch (error) {
        setServerError(
          codeForm,
          'code',
          getServerErrorMessage(
            error,
            { 403: 'Неверный код подтверждения' },
            'Ошибка подтверждения, попробуйте снова позже',
          ),
        );
      }
    },
  });

  if (step === 'confirm') {
    return (
      <FormShell form={codeForm} className='flex flex-col gap-3 rounded-xl border bg-muted/20 p-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground'>
            <MailIcon className='size-4' />
          </div>
          <span className='text-sm break-all text-muted-foreground'>Код отправлен на {pendingEmail}</span>
        </div>
        <FieldGroup>
          <CodeField
            form={codeForm}
            name='code'
            actions={
              <>
                <SubmitButton
                  form={codeForm}
                  className='flex-1 sm:flex-none'
                  withSpinner
                  disabled={values => values.code.trim().length !== 6}
                >
                  Подтвердить
                </SubmitButton>
                <Button type='button' variant='secondary' className='flex-1 sm:flex-none' onClick={onSubmit}>
                  Отмена
                </Button>
              </>
            }
          />
        </FieldGroup>

        <div className='flex flex-wrap items-center gap-2'>
          <Button
            type='button'
            variant='link'
            className='px-0'
            disabled={resendEmail.isPending}
            onClick={() => pendingEmail && resendEmail.mutate({ emailAddress: pendingEmail })}
          >
            Получить код снова
          </Button>
          <Button
            type='button'
            variant='ghost'
            onClick={() => {
              setStep('email');
              setPendingEmail(null);
              codeForm.reset();
            }}
          >
            Назад
          </Button>
        </div>

        {resendEmail.isSuccess && <p className='text-sm text-muted-foreground'>Код отправлен повторно</p>}
        {resendEmail.isError && <p className='text-sm text-destructive'>Не удалось отправить код</p>}
      </FormShell>
    );
  }

  return (
    <FormShell form={emailForm} className='flex flex-col gap-2 rounded-xl border bg-muted/20 p-3'>
      <p className='text-xs text-muted-foreground'>После сохранения мы отправим код подтверждения на новый адрес.</p>
      <FieldGroup>
        <TextField
          form={emailForm}
          name='emailAddress'
          icon={MailIcon}
          type='email'
          autoComplete='email'
          placeholder='example@mail.com'
          actions={
            <>
              <SubmitButton
                form={emailForm}
                className='flex-1 sm:flex-none'
                withSpinner
                disabled={values => values.emailAddress.trim() === user.emailAddress}
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

export const StoreAccountEmail: FC = () => {
  const { data: user, isLoading } = useUserMe();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-3 w-28' />
        <Skeleton className='h-5 w-52' />
      </div>
    );
  }

  if (!user) {
    return notFound();
  }

  return (
    <div className='flex items-center justify-between gap-3'>
      <div className='flex w-full min-w-0 flex-col gap-1'>
        <span className='text-xs font-medium text-muted-foreground'>Электронная почта</span>
        {isEdit ? (
          <AccountEmailForm user={user} onSubmit={() => setIsEdit(false)} />
        ) : (
          <span className='truncate font-medium'>{user.emailAddress}</span>
        )}
      </div>
      {!isEdit && (
        <Button
          variant='ghost'
          size='icon-sm'
          aria-label='Редактировать электронную почту'
          title='Редактировать электронную почту'
          onClick={() => setIsEdit(true)}
        >
          <PencilIcon />
        </Button>
      )}
    </div>
  );
};
