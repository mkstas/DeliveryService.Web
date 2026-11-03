'use client';

import { FC } from 'react';
import { MapPinIcon } from 'lucide-react';
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
import { useAddEstablishmentAddress } from '../hooks/useAddEstablishmentAddress';
import { Establishment } from '../types';

const establishmentAddressFormSchema = z.object({
  address: z.string().trim().min(1, 'Адрес не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type EstablishmentAddressFormSchema = z.infer<typeof establishmentAddressFormSchema>;

type EstablishmentAddressFormProps = {
  establishment: Establishment;
  onSuccess?: () => void;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.status === 403) {
      return 'Недостаточно прав для добавления адреса';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Ошибка добавления адреса, попробуйте снова позже';
};

export const EstablishmentAddressForm: FC<EstablishmentAddressFormProps> = ({ establishment, onSuccess }) => {
  const addAddress = useAddEstablishmentAddress();

  const form = useForm({
    defaultValues: {
      address: '',
    } as EstablishmentAddressFormSchema,
    validators: {
      onChange: establishmentAddressFormSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('address', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      try {
        await addAddress.mutateAsync({ establishmentId: establishment.id, address: value.address });
        form.reset();
        onSuccess?.();
      } catch (error) {
        const message = getErrorMessage(error);

        form.setFieldMeta('address', prev => ({
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
          name='address'
          listeners={{
            onChange: () => {
              form.setFieldMeta('address', prev => ({
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
                <FieldLabel htmlFor='establishment_address'>Адрес</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id='establishment_address'
                    type='text'
                    autoComplete='off'
                    aria-invalid={isError}
                    placeholder='г. Москва, ул. Ленина, д. 1'
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

        <form.Subscribe selector={state => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <Button type='submit' disabled={isSubmitting} size='lg' className='w-full'>
              Добавить адрес
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
