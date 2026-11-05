'use client';

import { FC } from 'react';
import { cn } from 'cn';
import { KeyRoundIcon, LoaderCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { HttpError } from '@/common/api';
import {
  Button,
  buttonVariants,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/common/components';
import { ROUTES } from '@/common/config';
import { takeConfirmPassword } from '../confirm-password-storage';
import { useConfirm } from '../hooks/useConfirm';
import { useLogin } from '../hooks/useLogin';
import { useResend } from '../hooks/useResend';

const confirmFormSchema = z.object({
  code: z.string().trim().length(6, 'Код состоит из шести символов'),
});

type ConfirmFormSchema = z.infer<typeof confirmFormSchema>;

type AuthConfirmFormProps = {
  emailAddress?: string;
};

const getConfirmErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 403) {
      return 'Неверный код подтверждения';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Не удалось подтвердить почту, попробуйте снова позже';
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
      form.setFieldMeta('code', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      if (!emailAddress) {
        return;
      }

      try {
        await confirm.mutateAsync({ code: value.code.trim(), emailAddress });
      } catch (error) {
        form.setFieldMeta('code', prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message: getConfirmErrorMessage(error) }] },
        }));

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
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name='code'
          listeners={{
            onChange: () => {
              form.setFieldMeta('code', prev => ({
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
                <FieldLabel htmlFor='auth_email_code'>Код из письма</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <KeyRoundIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='auth_email_code'
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
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={state => state.isSubmitting}>
          {isSubmitting => (
            <Button type='submit' size='lg' className='w-full' disabled={isSubmitting}>
              {isSubmitting && <LoaderCircleIcon className='animate-spin' />}
              Подтвердить
            </Button>
          )}
        </form.Subscribe>

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
    </form>
  );
};
