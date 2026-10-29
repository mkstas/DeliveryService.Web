'use client';

import { FC } from 'react';
import { KeyRoundIcon, MailIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { ApiError } from '@/common/api';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/common/components';
import { ROUTES } from '@/common/config';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';

const registerFormSchema = z.object({
  name: z.string().nonempty('Имя не может быть пустым').max(256, 'Максимальная длина 256 символа'),
  emailAddress: z.email('Неверный формат эл. почты').max(256, 'Максимальная длина 256 символа'),
  password: z.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа'),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.status === 409) {
      return 'Такой адрес эл. почты уже занят';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Ошибка регистрации, попробуйте снова позже';
};

export const RegisterForm: FC = () => {
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
      form.setFieldMeta('emailAddress', prev => ({ ...prev, errorMap: { ...prev.errorMap, onServer: undefined } }));
      form.setFieldMeta('password', prev => ({ ...prev, errorMap: { ...prev.errorMap, onServer: undefined } }));

      try {
        await register.mutateAsync(value);
        router.push(`${ROUTES.CONFIRM}?emailAddress=${value.emailAddress}&password=${value.password}`);
      } catch (error) {
        const field = error instanceof ApiError && error.status === 409 ? 'emailAddress' : 'password';
        const message = getErrorMessage(error);

        form.setFieldMeta(field, prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message }] },
        }));

        return;
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
                <FieldLabel htmlFor='name'>Имя пользователя</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id='name'
                    type='text'
                    aria-invalid={isError}
                    placeholder='Александр'
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <InputGroupAddon>
                    <UserIcon />
                  </InputGroupAddon>
                </InputGroup>
                {isError && <FieldError errors={field.state.meta.errors} />}
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
                <FieldLabel htmlFor='email_address'>Адрес электронной почты</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id='email_address'
                    type='email'
                    aria-invalid={isError}
                    placeholder='example@mail.com'
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
                {isError && <FieldError errors={field.state.meta.errors} />}
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
                <FieldLabel htmlFor='password'>Пароль</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id='password'
                    type='password'
                    aria-invalid={isError}
                    placeholder='••••••••'
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <InputGroupAddon>
                    <KeyRoundIcon />
                  </InputGroupAddon>
                </InputGroup>
                {isError && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={state => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <Button type='submit' disabled={isSubmitting} size='lg' className='w-full'>
              Зарегистрироваться
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
