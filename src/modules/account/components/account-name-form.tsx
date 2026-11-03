'use client';

import { FC } from 'react';
import { UserIcon } from 'lucide-react';
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
import { useUpdateUserBio } from '../hooks/useUpdateUserBio';

const accountNameFormSchema = z.object({
  name: z.string().trim().min(1, 'Имя не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type AccountNameFormSchema = z.infer<typeof accountNameFormSchema>;

type AccountNameFormProps = {
  user: User;
  onSuccess?: () => void;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError && error.serverMessage) {
    return error.serverMessage;
  }

  return 'Ошибка сохранения имени, попробуйте снова позже';
};

export const AccountNameForm: FC<AccountNameFormProps> = ({ user, onSuccess }) => {
  const updateBio = useUpdateUserBio();

  const form = useForm({
    defaultValues: {
      name: user.name,
    } as AccountNameFormSchema,
    validators: {
      onChange: accountNameFormSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('name', prev => ({ ...prev, errorMap: { ...prev.errorMap, onServer: undefined } }));

      if (value.name === user.name) {
        return;
      }

      try {
        await updateBio.mutateAsync({ name: value.name });
        onSuccess?.();
      } catch (error) {
        form.setFieldMeta('name', prev => ({
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
          name='name'
          listeners={{
            onChange: () => {
              form.setFieldMeta('name', prev => ({
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
                        id='account_name'
                        type='text'
                        autoComplete='name'
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
                  </div>

                  <form.Subscribe selector={state => ({ isSubmitting: state.isSubmitting, name: state.values.name })}>
                    {({ isSubmitting, name }) => (
                      <Button type='submit' disabled={isSubmitting || name.trim() === user.name}>
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
