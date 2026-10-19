'use client';

import { FC } from 'react';
import { KeyRoundIcon, MailIcon, UserIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
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

const registerFormSchema = z.object({
  name: z.string().nonempty('Имя не может быть пустым').max(256, 'Максимальная длина 256 символа'),
  emailAddress: z.email('Неверный формат эл. почты').max(256, 'Максимальная длина 256 символа'),
  password: z.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа'),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export const RegisterForm: FC = () => {
  const mutation = useMutation({
    mutationFn: (data: RegisterFormSchema) => {
      return fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        credentials: 'include',
      });
    },
    onSuccess: res => {
      console.log(res.status);
    },
    onError: res => {
      alert(res.message);
    },
  });

  const form = useForm({
    defaultValues: {
      name: '',
      emailAddress: '',
      password: '',
    } as RegisterFormSchema,
    validators: {
      onChange: registerFormSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
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

        <form.Field name='emailAddress'>
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

        <form.Field name='password'>
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
              Войти
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
