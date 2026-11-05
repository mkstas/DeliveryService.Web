'use client';

import { FC, useState } from 'react';
import { KeyRoundIcon, LoaderCircleIcon, MailIcon, PencilIcon } from 'lucide-react';
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
import { useConfirmUserEmail } from '../hooks/useConfirmUserEmail';
import { useResendUserEmail } from '../hooks/useResendUserEmail';
import { useUpdateUserEmail } from '../hooks/useUpdateUserEmail';

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

const getUpdateEmailErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 409) {
      return 'Такой адрес эл. почты уже занят';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Ошибка сохранения эл. почты, попробуйте снова позже';
};

const getConfirmEmailErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 403) {
      return 'Неверный код подтверждения';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Ошибка подтверждения, попробуйте снова позже';
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
      emailForm.setFieldMeta('emailAddress', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      const emailAddress = value.emailAddress.trim();

      if (emailAddress === user.emailAddress) {
        return;
      }

      try {
        await updateEmail.mutateAsync({ emailAddress });
        setPendingEmail(emailAddress);
        setStep('confirm');
      } catch (error) {
        emailForm.setFieldMeta('emailAddress', prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message: getUpdateEmailErrorMessage(error) }] },
        }));
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
      codeForm.setFieldMeta('code', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      if (!pendingEmail) {
        return;
      }

      try {
        await confirmEmail.mutateAsync({ code: value.code.trim(), emailAddress: pendingEmail });
        onSubmit();
      } catch (error) {
        codeForm.setFieldMeta('code', prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message: getConfirmEmailErrorMessage(error) }] },
        }));
      }
    },
  });

  if (step === 'confirm') {
    return (
      <form
        className='flex flex-col gap-3 rounded-xl border bg-muted/20 p-3'
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          codeForm.handleSubmit();
        }}
      >
        <div className='flex items-center gap-3'>
          <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground'>
            <MailIcon className='size-4' />
          </div>
          <span className='text-sm break-all text-muted-foreground'>Код отправлен на {pendingEmail}</span>
        </div>
        <FieldGroup>
          <codeForm.Field
            name='code'
            listeners={{
              onChange: () => {
                codeForm.setFieldMeta('code', prev => ({
                  ...prev,
                  errorMap: { ...prev.errorMap, onServer: undefined },
                }));
              },
            }}
          >
            {field => {
              const isError =
                field.state.meta.errors.length > 0 && (field.state.meta.isTouched || codeForm.state.isSubmitted);

              return (
                <Field>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start'>
                    <div className='flex min-w-0 flex-1 flex-col gap-2'>
                      <InputGroup>
                        <InputGroupAddon>
                          <KeyRoundIcon />
                        </InputGroupAddon>
                        <InputGroupInput
                          id='account_email_code'
                          type='text'
                          inputMode='numeric'
                          autoComplete='one-time-code'
                          maxLength={6}
                          aria-invalid={isError}
                          placeholder='000000'
                          value={field.state.value}
                          onChange={e => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </InputGroup>
                      {isError && <FieldError errors={field.state.meta.errors.slice(0, 1)} />}
                    </div>
                    <div className='flex shrink-0 gap-2'>
                      <codeForm.Subscribe
                        selector={state => ({
                          isSubmitting: state.isSubmitting,
                          code: state.values.code,
                        })}
                      >
                        {({ isSubmitting, code }) => (
                          <Button
                            type='submit'
                            className='flex-1 sm:flex-none'
                            disabled={isSubmitting || code.trim().length !== 6}
                          >
                            {isSubmitting && <LoaderCircleIcon className='animate-spin' />}
                            Подтвердить
                          </Button>
                        )}
                      </codeForm.Subscribe>
                      <Button type='button' variant='secondary' className='flex-1 sm:flex-none' onClick={onSubmit}>
                        Отмена
                      </Button>
                    </div>
                  </div>
                </Field>
              );
            }}
          </codeForm.Field>
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
      </form>
    );
  }

  return (
    <form
      className='flex flex-col gap-2 rounded-xl border bg-muted/20 p-3'
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        emailForm.handleSubmit();
      }}
    >
      <p className='text-xs text-muted-foreground'>После сохранения мы отправим код подтверждения на новый адрес.</p>
      <FieldGroup>
        <emailForm.Field
          name='emailAddress'
          listeners={{
            onChange: () => {
              emailForm.setFieldMeta('emailAddress', prev => ({
                ...prev,
                errorMap: { ...prev.errorMap, onServer: undefined },
              }));
            },
          }}
        >
          {field => {
            const isError =
              field.state.meta.errors.length > 0 && (field.state.meta.isTouched || emailForm.state.isSubmitted);

            return (
              <Field>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-start'>
                  <div className='flex min-w-0 flex-1 flex-col gap-2'>
                    <InputGroup>
                      <InputGroupAddon>
                        <MailIcon />
                      </InputGroupAddon>
                      <InputGroupInput
                        id='account_email_address'
                        type='email'
                        autoComplete='email'
                        aria-invalid={isError}
                        placeholder='example@mail.com'
                        value={field.state.value}
                        onChange={e => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </InputGroup>
                    {isError && <FieldError errors={field.state.meta.errors.slice(0, 1)} />}
                  </div>
                  <div className='flex shrink-0 gap-2'>
                    <emailForm.Subscribe
                      selector={state => ({
                        isSubmitting: state.isSubmitting,
                        emailAddress: state.values.emailAddress,
                      })}
                    >
                      {({ isSubmitting, emailAddress }) => (
                        <Button
                          type='submit'
                          className='flex-1 sm:flex-none'
                          disabled={isSubmitting || emailAddress.trim() === user.emailAddress}
                        >
                          {isSubmitting && <LoaderCircleIcon className='animate-spin' />}
                          Сохранить
                        </Button>
                      )}
                    </emailForm.Subscribe>
                    <Button type='button' variant='secondary' className='flex-1 sm:flex-none' onClick={onSubmit}>
                      Отмена
                    </Button>
                  </div>
                </div>
              </Field>
            );
          }}
        </emailForm.Field>
      </FieldGroup>
    </form>
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
