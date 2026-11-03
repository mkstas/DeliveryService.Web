'use client';

import { FC } from 'react';
import { MailIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { ApiError } from '@/common/api';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/common/components';
import { User } from '@/modules/auth';
import { useUpdateUserEmail } from '../hooks/useUpdateUserEmail';

const accountEmailFormSchema = z.object({
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
});

type AccountEmailFormSchema = z.infer<typeof accountEmailFormSchema>;

type AccountEmailFormProps = {
  user: User;
  onSuccess?: () => void;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.status === 409) {
      return 'Такой адрес эл. почты уже занят';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Ошибка сохранения эл. почты, попробуйте снова позже';
};

export const AccountEmailForm: FC<AccountEmailFormProps> = ({ user, onSuccess }) => {
  const updateEmail = useUpdateUserEmail();

  const form = useForm({
    defaultValues: {
      emailAddress: user.emailAddress,
    } as AccountEmailFormSchema,
    validators: {
      onChange: accountEmailFormSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('emailAddress', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      if (value.emailAddress === user.emailAddress) {
        return;
      }

      try {
        await updateEmail.mutateAsync({ emailAddress: value.emailAddress });
        onSuccess?.();
      } catch (error) {
        form.setFieldMeta('emailAddress', prev => ({
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
                <div className='flex items-start gap-2'>
                  <div className='flex min-w-0 flex-1 flex-col gap-2'>
                    <InputGroup>
                      <InputGroupInput
                        id='account_email_address'
                        type='email'
                        autoComplete='email'
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
                  </div>

                  <form.Subscribe
                    selector={state => ({
                      isSubmitting: state.isSubmitting,
                      emailAddress: state.values.emailAddress,
                    })}
                  >
                    {({ isSubmitting, emailAddress }) => (
                      <Button type='submit' disabled={isSubmitting || emailAddress.trim() === user.emailAddress}>
                        Сохранить
                      </Button>
                    )}
                  </form.Subscribe>
                </div>
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
    </form>
  );
};
