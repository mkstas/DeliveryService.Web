'use client';

import { FC } from 'react';
import { KeyRoundIcon } from 'lucide-react';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
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
import { ROUTES } from '@/common/config';
import { useConfirm } from '../hooks/useConfirm';
import { useLogin } from '../hooks/useLogin';
import { useResend } from '../hooks/useResend';

const confirmDataSchema = z.object({
  code: z.string().length(6, 'Код состит из шести символов'),
});

type ConfirmDataSchema = z.infer<typeof confirmDataSchema>;

export const ConfirmForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailAddress = searchParams.get('emailAddress') as string;
  const password = searchParams.get('password') as string;

  const confirm = useConfirm();
  const resend = useResend();
  const login = useLogin();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof ApiError) {
      if (error.status === 403) {
        return 'Неверный код подтверждения';
      }

      if (error.serverMessage) {
        return error.serverMessage;
      }
    }

    return 'Ошибка подтверждения, попробуйте снова позже';
  };

  const form = useForm({
    defaultValues: {
      code: '',
    } as ConfirmDataSchema,
    validators: {
      onChange: confirmDataSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('code', prev => ({ ...prev, errorMap: { ...prev.errorMap, onServer: undefined } }));

      try {
        await confirm.mutateAsync({ code: value.code, emailAddress });
      } catch (error) {
        const message = getErrorMessage(error);

        form.setFieldMeta('code', prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message }] },
        }));

        return;
      }

      try {
        await login.mutateAsync({ emailAddress, password });
        router.push(ROUTES.STORE);
      } catch (error) {
        const message = getErrorMessage(error);

        form.setFieldMeta('code', prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message }] },
        }));
      }
    },
  });

  if (!emailAddress && !password) {
    return notFound();
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name='code'>
          {field => {
            const isError =
              field.state.meta.errors.length > 0 && (field.state.meta.isTouched || form.state.isSubmitted);

            return (
              <Field>
                <InputGroup>
                  <InputGroupInput
                    id='code'
                    type='text'
                    aria-invalid={isError}
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
              Подтвердить
            </Button>
          )}
        </form.Subscribe>

        <Button type='button' variant={'link'} onClick={() => resend.mutate({ emailAddress })}>
          Получить код снова
        </Button>
      </FieldGroup>
    </form>
  );
};
