'use client';

import { FC, useState } from 'react';
import { EyeIcon, EyeOffIcon, KeyRoundIcon, LoaderCircleIcon, MailIcon } from 'lucide-react';
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
import { useLogin } from '../hooks/useLogin';

const loginFormSchema = z.object({
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
  password: z.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа'),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 401) {
      return 'Неверный адрес эл. почты или пароль';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Не удалось войти, попробуйте снова позже';
};

type AuthLoginFormProps = {
  defaultEmailAddress?: string;
};

export const AuthLoginForm: FC<AuthLoginFormProps> = ({ defaultEmailAddress = '' }) => {
  const router = useRouter();
  const login = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm({
    defaultValues: {
      emailAddress: defaultEmailAddress,
      password: '',
    } as LoginFormSchema,
    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('password', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      try {
        await login.mutateAsync(value);
        router.push(ROUTES.STORE);
      } catch (error) {
        form.setFieldMeta('password', prev => ({
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
                    autoComplete='current-password'
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
              {isSubmitting && <LoaderCircleIcon className='animate-spin' />}
              Войти
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
