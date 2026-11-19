'use client';

import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  PasswordField,
  setServerError,
  SubmitButton,
  TextField,
} from '@/features/form';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { MailIcon, UserIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useCreateUser } from '../hooks/mutations';

const createUserFormSchema = z.object({
  name: z.string().trim().min(1, 'Имя не может быть пустым').max(256, 'Максимальная длина 256 символов'),
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
  password: z.string().min(8, 'Пароль должен содержать не менее 8 символов'),
});

type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;

type CreateUserFormProps = {
  onSuccess?: () => void;
};

export const CreateUserForm: FC<CreateUserFormProps> = ({ onSuccess }) => {
  const createUser = useCreateUser();

  const form = useForm({
    defaultValues: {
      name: '',
      emailAddress: '',
      password: '',
    } as CreateUserFormSchema,
    validators: {
      onChange: createUserFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name', 'emailAddress', 'password']);

      try {
        await createUser.mutateAsync({
          name: value.name.trim(),
          emailAddress: value.emailAddress.trim(),
          password: value.password,
        });
        form.reset();
        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'emailAddress',
          getServerErrorMessage(
            error,
            { 409: 'Пользователь с такой эл. почтой уже существует' },
            'Не удалось создать пользователя, попробуйте позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='name' label='Имя пользователя' icon={UserIcon} autoComplete='name' />
        <TextField
          form={form}
          name='emailAddress'
          label='Электронная почта'
          icon={MailIcon}
          type='email'
          autoComplete='email'
        />
        <PasswordField form={form} name='password' label='Пароль' autoComplete='new-password' />
        <SubmitButton form={form} className='w-full'>
          Создать пользователя
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
