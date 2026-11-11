'use client';

import { type FC } from 'react';
import { MapPinIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { FieldGroup } from '@/common/components';
import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/common/forms';
import { useAddEstablishmentAddress } from '../hooks/mutations';

const addEstablishmentAddressFormSchema = z.object({
  address: z.string().trim().min(1, 'Адрес не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type AddEstablishmentAddressFormSchema = z.infer<typeof addEstablishmentAddressFormSchema>;

type AddEstablishmentAddressFormProps = {
  establishmentId: string;
};

export const AddEstablishmentAddressForm: FC<AddEstablishmentAddressFormProps> = ({ establishmentId }) => {
  const addEstablishmentAddress = useAddEstablishmentAddress();

  const form = useForm({
    defaultValues: {
      address: '',
    } as AddEstablishmentAddressFormSchema,
    validators: {
      onChange: addEstablishmentAddressFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['address']);

      try {
        await addEstablishmentAddress.mutateAsync({ establishmentId, address: value.address.trim() });
        form.reset();
      } catch (error) {
        setServerError(
          form,
          'address',
          getServerErrorMessage(error, {}, 'Не удалось добавить адрес, попробуйте позже'),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup className='sm:flex-row sm:items-start sm:gap-3'>
        <TextField form={form} name='address' icon={MapPinIcon} autoComplete='off' placeholder='Адрес заведения' />
        <SubmitButton form={form} className='max-sm:w-full'>
          Добавить
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
