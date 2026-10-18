'use client';

import { FC } from 'react';
import { KeyRoundIcon, MailIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
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

const loginFormSchema = z.object({
  emailAddress: z.email('Неверный формат эл. почты').max(256, 'Максимальная длина 256 символа'),
  password: z.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа'),
});

export const LoginForm: FC = () => {
  const form = useForm({
    defaultValues: {
      emailAddress: '',
      password: '',
    } as z.infer<typeof loginFormSchema>,
    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
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
