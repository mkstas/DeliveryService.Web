'use client';

import { FC } from 'react';
import { CreditCardIcon, MapPinIcon } from 'lucide-react';
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
import { useCreateEstablishment } from '../hooks/useCreateEstablishment';
import { useUpdateEstablishment } from '../hooks/useUpdateEstablishment';
import { Establishment } from '../types';

const establishmentFormSchema = z.object({
  name: z.string().trim().min(1, 'Название заведения не может быть пустым').max(256, 'Максимальная длина 256 символов'),
  businessAccount: z.string().regex(/^\d{20}$/, 'Бизнес-счёт должен состоять из 20 цифр'),
});

type EstablishmentFormSchema = z.infer<typeof establishmentFormSchema>;

type EstablishmentFormProps = {
  establishment?: Establishment;
  onSuccess?: () => void;
};

const getErrorMessage = (error: unknown, isEditing: boolean): string => {
  if (error instanceof ApiError) {
    if (error.status === 409) {
      return 'Заведение с таким бизнес-счётом уже существует';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return isEditing
    ? 'Ошибка сохранения заведения, попробуйте снова позже'
    : 'Ошибка создания заведения, попробуйте снова позже';
};

export const EstablishmentForm: FC<EstablishmentFormProps> = ({ establishment, onSuccess }) => {
  const createEstablishment = useCreateEstablishment();
  const updateEstablishment = useUpdateEstablishment();
  const isEditing = !!establishment;

  const form = useForm({
    defaultValues: {
      name: establishment?.name ?? '',
      businessAccount: establishment?.businessAccount ?? '',
    } as EstablishmentFormSchema,
    validators: {
      onChange: establishmentFormSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('businessAccount', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      try {
        if (establishment) {
          await updateEstablishment.mutateAsync({ id: establishment.id, data: value });
        } else {
          await createEstablishment.mutateAsync(value);
          form.reset();
        }

        onSuccess?.();
      } catch (error) {
        const message = getErrorMessage(error, isEditing);

        form.setFieldMeta('businessAccount', prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message }] },
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
                  <InputGroupInput
                    id='establishment_name'
                    type='text'
                    aria-invalid={isError}
                    placeholder='Пиццерия на Ленина'
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <InputGroupAddon>
                    <MapPinIcon />
                  </InputGroupAddon>
                </InputGroup>
                {isError && <FieldError errors={field.state.meta.errors} />}
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
                <FieldLabel htmlFor='establishment_business_account'>Бизнес-счёт</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id='establishment_business_account'
                    type='text'
                    inputMode='numeric'
                    autoComplete='off'
                    maxLength={20}
                    aria-invalid={isError}
                    placeholder='00000000000000000000'
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <InputGroupAddon>
                    <CreditCardIcon />
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
              {isEditing ? 'Сохранить' : 'Создать заведение'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
