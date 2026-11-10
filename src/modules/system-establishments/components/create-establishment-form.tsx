'use client';

import { FC } from 'react';
import { CreditCardIcon, MapPinIcon } from 'lucide-react';
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
  InputGroupInput,
} from '@/common/components';
import { useCreateEstablishment } from '../hooks/useCreateEstablishment';

const establishmentFormSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
  businessAccount: z.string().trim().length(20, 'Номер должень быть длиной 20 цифр'),
});

type EstablishmentFormSchema = z.infer<typeof establishmentFormSchema>;

type CreateEstablishmentFormProps = {
  onSuccess?: () => void;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 409) {
      return 'Заведение уже существует';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Не удалось создать заведение, попробуйте снова позже';
};

export const CreateEstablishmentForm: FC<CreateEstablishmentFormProps> = ({ onSuccess }) => {
  const createEstablishment = useCreateEstablishment();

  const form = useForm({
    defaultValues: {
      name: '',
      businessAccount: '',
    } as EstablishmentFormSchema,
    validators: {
      onChange: establishmentFormSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('name', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      try {
        await createEstablishment.mutateAsync({ name: value.name.trim(), businessAccount: value.businessAccount });
        form.reset();
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
                <FieldLabel htmlFor='establishment_name'>Название заведения</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <MapPinIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='establishment_name'
                    type='text'
                    autoComplete='off'
                    aria-invalid={isError}
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
          name='businessAccount'
          listeners={{
            onChange: () => {
              form.setFieldMeta('businessAccount', prev => ({
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
                <FieldLabel htmlFor='business_account'>Банковский счет</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <CreditCardIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='business_account'
                    type='text'
                    autoComplete='off'
                    aria-invalid={isError}
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

        <form.Subscribe selector={state => state.isSubmitting}>
          {isSubmitting => (
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              Создать заведение
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
