'use client';

import { FC } from 'react';
import { KeyRoundIcon, MailIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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

const formSchema = z.object({
  emailAddress: z.email('Неверный формат эл. почты').max(256, 'Максимальная длина 256 символа'),
  password: z.string().min(8, 'Минимальная длина 8 символов').max(32, 'Максимальная длина 32 символа'),
});

export const LoginForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='emailAddress'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor='email_address'>Адрес электронной почты</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id='email_address'
                  aria-invalid={fieldState.invalid}
                  placeholder='example@mail.com'
                />
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor='password'>Пароль</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id='password'
                  type='password'
                  aria-invalid={fieldState.invalid}
                  placeholder='••••••••'
                />
                <InputGroupAddon>
                  <KeyRoundIcon />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type='submit' size='lg' className='w-full'>
          Войти
        </Button>
      </FieldGroup>
    </form>
  );
};
