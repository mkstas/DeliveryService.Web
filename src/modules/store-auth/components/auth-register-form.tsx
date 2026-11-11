'use client';

import { type FC } from 'react';
import { MailIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { HttpError } from '@/common/api';
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
import { storeConfirmPassword } from '../confirm-password-storage';
import { useRegister } from '../hooks/mutations';

const registerFormSchema = z.object({
  name: z.string().trim().min(1, 'Имя не может быть пустым').max(256, 'Максимальная длина 256 символов'),
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
  password: z.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа'),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export const AuthRegisterForm: FC = () => {
  const router = useRouter();
  const register = useRegister();

  const form = useForm({
    defaultValues: {
      name: '',
      emailAddress: '',
      password: '',
    } as RegisterFormSchema,
    validators: {
      onChange: registerFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['emailAddress', 'password']);

      const data = {
        name: value.name.trim(),
        emailAddress: value.emailAddress.trim(),
        password: value.password,
      };

      try {
        await register.mutateAsync(data);
        storeConfirmPassword(data.emailAddress, data.password);
        router.push(`${ROUTES.CONFIRM}?emailAddress=${encodeURIComponent(data.emailAddress)}`);
      } catch (error) {
        const field = error instanceof HttpError && error.status === 409 ? 'emailAddress' : 'password';

        setServerError(
          form,
          field,
          getServerErrorMessage(
            error,
            { 409: 'Пользователь с таким адресом эл. почты уже существует' },
            'Не удалось зарегистрироваться, попробуйте снова позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='name' label='Имя' icon={UserIcon} autoComplete='name' placeholder='Ваше имя' />
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
          autoComplete='new-password'
          placeholder='Введите пароль'
        />
        <SubmitButton form={form} size='lg' className='w-full'>
          Зарегистрироваться
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
