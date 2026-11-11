'use client';

import { type FC } from 'react';
import { cn } from 'cn';
import { LoaderCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { Button, buttonVariants, FieldGroup } from '@/common/components';
import { ROUTES } from '@/common/config';
import {
  clearServerErrors,
  CodeField,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
} from '@/common/forms';
import { takeConfirmPassword } from '../confirm-password-storage';
import { useConfirm, useLogin, useResend } from '../hooks/mutations';

const confirmFormSchema = z.object({
  code: z.string().trim().length(6, 'Код состоит из шести символов'),
});

type ConfirmFormSchema = z.infer<typeof confirmFormSchema>;

type AuthConfirmFormProps = {
  emailAddress?: string;
};

export const AuthConfirmForm: FC<AuthConfirmFormProps> = ({ emailAddress }) => {
  const router = useRouter();
  const confirm = useConfirm();
  const login = useLogin();
  const resend = useResend();

  const form = useForm({
    defaultValues: {
      code: '',
    } as ConfirmFormSchema,
    validators: {
      onChange: confirmFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['code']);

      if (!emailAddress) {
        return;
      }

      try {
        await confirm.mutateAsync({ code: value.code.trim(), emailAddress });
      } catch (error) {
        setServerError(
          form,
          'code',
          getServerErrorMessage(
            error,
            { 403: 'Неверный код подтверждения' },
            'Не удалось подтвердить почту, попробуйте снова позже',
          ),
        );

        return;
      }

      const loginRoute = `${ROUTES.LOGIN}?emailAddress=${encodeURIComponent(emailAddress)}`;
      const password = takeConfirmPassword(emailAddress);

      if (!password) {
        router.push(loginRoute);
        return;
      }

      try {
        await login.mutateAsync({ emailAddress, password });
        router.push(ROUTES.STORE);
      } catch {
        router.push(loginRoute);
      }
    },
  });

  if (!emailAddress) {
    return (
      <div className='flex flex-col gap-3'>
        <p className='text-sm text-muted-foreground'>Не указан адрес электронной почты. Начните регистрацию заново.</p>
        <Link href={ROUTES.REGISTER} className={cn(buttonVariants({ size: 'lg' }), 'w-full')}>
          К регистрации
        </Link>
      </div>
    );
  }

  return (
    <FormShell form={form}>
      <FieldGroup>
        <CodeField form={form} name='code' label='Код из письма' />
        <SubmitButton form={form} size='lg' className='w-full' withSpinner>
          Подтвердить
        </SubmitButton>

        <div className='flex flex-col items-center gap-2'>
          <Button
            type='button'
            variant='link'
            size='sm'
            disabled={resend.isPending}
            onClick={() => resend.mutate({ emailAddress })}
          >
            {resend.isPending && <LoaderCircleIcon className='animate-spin' />}
            Получить код снова
          </Button>
          {resend.isSuccess && <p className='text-sm text-muted-foreground'>Код отправлен повторно</p>}
          {resend.isError && <p className='text-sm text-destructive'>Не удалось отправить код</p>}
        </div>
      </FieldGroup>
    </FormShell>
  );
};
