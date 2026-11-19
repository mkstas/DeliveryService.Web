'use client';

import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/features/form';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { MapPinIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useAddRestaurantAddress } from '../hooks/mutations';

const addAddressFormSchema = z.object({
  address: z.string().trim().min(1, 'Адрес не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type AddAddressFormSchema = z.infer<typeof addAddressFormSchema>;

type AddRestaurantAddressFormProps = {
  restaurantId: string;
};

export const AddRestaurantAddressForm: FC<AddRestaurantAddressFormProps> = ({ restaurantId }) => {
  const addRestaurantAddress = useAddRestaurantAddress();

  const form = useForm({
    defaultValues: {
      address: '',
    } as AddAddressFormSchema,
    validators: {
      onChange: addAddressFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['address']);

      try {
        await addRestaurantAddress.mutateAsync({ restaurantId, address: value.address.trim() });
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
        <TextField form={form} name='address' icon={MapPinIcon} autoComplete='off' placeholder='Адрес ресторана' />
        <SubmitButton form={form} className='max-sm:w-full'>
          Добавить
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
