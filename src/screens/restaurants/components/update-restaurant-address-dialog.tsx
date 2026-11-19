'use client';

import {
  clearServerErrors,
  FormDialog,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/features/form';
import type { RestaurantAddress } from '@/shared/api';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { PencilIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useUpdateRestaurantAddress } from '../hooks/mutations';

const updateAddressFormSchema = z.object({
  address: z.string().trim().min(1, 'Адрес не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type UpdateAddressFormSchema = z.infer<typeof updateAddressFormSchema>;

type UpdateAddressFormProps = {
  restaurantId: string;
  address: RestaurantAddress;
  onSuccess?: () => void;
};

const UpdateAddressForm: FC<UpdateAddressFormProps> = ({ restaurantId, address, onSuccess }) => {
  const updateRestaurantAddress = useUpdateRestaurantAddress();

  const form = useForm({
    defaultValues: {
      address: address.address,
    } as UpdateAddressFormSchema,
    validators: {
      onChange: updateAddressFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['address']);

      try {
        await updateRestaurantAddress.mutateAsync({
          restaurantId,
          addressId: address.id,
          address: value.address.trim(),
        });
        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'address',
          getServerErrorMessage(error, {}, 'Не удалось обновить адрес, попробуйте позже'),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='address' label='Адрес' autoComplete='off' />
        <SubmitButton form={form} className='w-full'>
          Обновить адрес
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};

type UpdateRestaurantAddressDialogProps = {
  restaurantId: string;
  address: RestaurantAddress;
};

export const UpdateRestaurantAddressDialog = ({ restaurantId, address }: UpdateRestaurantAddressDialogProps) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать адрес' }}
      title='Обновление адреса'
      description='Измените адрес ресторана'
    >
      {close => <UpdateAddressForm restaurantId={restaurantId} address={address} onSuccess={close} />}
    </FormDialog>
  );
};
