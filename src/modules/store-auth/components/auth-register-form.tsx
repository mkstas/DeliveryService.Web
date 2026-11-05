'use client';

import { FC, useState } from 'react';
import { EyeIcon, EyeOffIcon, KeyRoundIcon, MailIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { HttpError } from '@/common/api';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/common/components';
import { ROUTES } from '@/common/config';
import { storeConfirmPassword } from '../confirm-password-storage';
import { useRegister } from '../hooks/useRegister';

const registerFormSchema = z.object({
  name: z.string().trim().min(1, 'Имя не может быть пустым').max(256, 'Максимальная длина 256 символов'),
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
  password: z.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа'),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 409) {
      return 'Пользователь с таким адресом эл. почты уже существует';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Не удалось зарегистрироваться, попробуйте снова позже';
};

export const AuthRegisterForm: FC = () => {
  const router = useRouter();
  const register = useRegister();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
      form.setFieldMeta('emailAddress', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));
      form.setFieldMeta('password', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

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

        form.setFieldMeta(field, prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message: getErrorMessage(error) }] },
        }));
      }
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name='name'>
          {field => {
            const isError =
              field.state.meta.errors.length > 0 && (field.state.meta.isTouched || form.state.isSubmitted);

            return (
              <Field>
                <FieldLabel htmlFor='auth_name'>Имя</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <UserIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='auth_name'
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
              </Field>
            );
          }}
        </form.Field>

        <form.Field
          name='emailAddress'
          listeners={{
            onChange: () => {
              form.setFieldMeta('emailAddress', prev => ({
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
                <FieldLabel htmlFor='auth_email_address'>Электронная почта</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='auth_email_address'
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
              </Field>
            );
          }}
        </form.Field>

        <form.Field
          name='password'
          listeners={{
            onChange: () => {
              form.setFieldMeta('password', prev => ({
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
                <FieldLabel htmlFor='auth_password'>Пароль</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <KeyRoundIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='auth_password'
                    type={isPasswordVisible ? 'text' : 'password'}
                    autoComplete='new-password'
                    aria-invalid={isError}
                    placeholder='Введите пароль'
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <InputGroupAddon align='inline-end'>
                    <InputGroupButton
                      size='icon-sm'
                      aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                      title={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                      onClick={() => setIsPasswordVisible(prev => !prev)}
                    >
                      {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {isError && <FieldError errors={field.state.meta.errors.slice(0, 1)} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={state => state.isSubmitting}>
          {isSubmitting => (
            <Button type='submit' size='lg' className='w-full' disabled={isSubmitting}>
              Зарегистрироваться
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
