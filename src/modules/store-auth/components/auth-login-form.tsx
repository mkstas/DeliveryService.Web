'use client';

import { type FC } from 'react';
import { MailIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { FieldGroup } from '@/common/components';
import { ROUTES } from '@/common/config';
import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  PasswordField,
  setServerError,
  SubmitButton,
  TextField,
} from '@/common/forms';
import { useLogin } from '../hooks/mutations';

const loginFormSchema = z.object({
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
  password: z.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа'),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

type AuthLoginFormProps = {
  defaultEmailAddress?: string;
};

export const AuthLoginForm: FC<AuthLoginFormProps> = ({ defaultEmailAddress = '' }) => {
  const router = useRouter();
  const login = useLogin();

  const form = useForm({
    defaultValues: {
      emailAddress: defaultEmailAddress,
      password: '',
    } as LoginFormSchema,
    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['password']);

      try {
        await login.mutateAsync(value);
        router.push(ROUTES.STORE);
      } catch (error) {
        setServerError(
          form,
          'password',
          getServerErrorMessage(
            error,
            { 401: 'Неверный адрес эл. почты или пароль' },
            'Не удалось войти, попробуйте снова позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField
          form={form}
          name='emailAddress'
          label='Электронная почта'
          icon={MailIcon}
          type='email'
          autoComplete='email'
          placeholder='example@mail.com'
        />
        <PasswordField
          form={form}
          name='password'
          label='Пароль'
          autoComplete='current-password'
          placeholder='Введите пароль'
        />
        <SubmitButton form={form} size='lg' className='w-full' withSpinner>
          Войти
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
