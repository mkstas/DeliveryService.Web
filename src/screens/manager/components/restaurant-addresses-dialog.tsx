'use client';

import { type EntityColumn, EntityTable, RemoveDialog } from '@/features/crud';
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
import { ChevronDownIcon, MapPinIcon, PencilIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import {
  useAddMyRestaurantAddress,
  useRemoveMyRestaurantAddress,
  useUpdateMyRestaurantAddress,
} from '../hooks/mutations';

const addressFormSchema = z.object({
  address: z.string().trim().min(1, 'Адрес не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type AddressFormSchema = z.infer<typeof addressFormSchema>;

type AddressFormProps = {
  initialAddress?: string;
  onSubmit: (address: string) => Promise<void>;
  onSuccess?: () => void;
  submitLabel: string;
};

const AddressForm: FC<AddressFormProps> = ({ initialAddress = '', onSubmit, onSuccess, submitLabel }) => {
  const form = useForm({
    defaultValues: { address: initialAddress } as AddressFormSchema,
    validators: { onChange: addressFormSchema },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['address']);

      try {
        await onSubmit(value.address.trim());
        form.reset();
        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'address',
          getServerErrorMessage(error, {}, 'Не удалось сохранить адрес, попробуйте позже'),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup className='sm:flex-row sm:items-start sm:gap-3'>
        <TextField form={form} name='address' icon={MapPinIcon} autoComplete='off' placeholder='Адрес заведения' />
        <SubmitButton form={form} className='max-sm:w-full'>
          {submitLabel}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};

export const RestaurantAddressesDialog: FC<{ addresses: RestaurantAddress[] }> = ({ addresses }) => {
  const addAddress = useAddMyRestaurantAddress();
  const updateAddress = useUpdateMyRestaurantAddress();
  const removeAddress = useRemoveMyRestaurantAddress();

  const columns: EntityColumn<RestaurantAddress>[] = [
    {
      header: 'Адрес',
      cell: address => address.address,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: address => (
        <>
          <FormDialog
            trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать адрес' }}
            title='Обновление адреса'
            description='Измените адрес заведения'
          >
            {close => (
              <AddressForm
                initialAddress={address.address}
                submitLabel='Сохранить'
                onSubmit={value => updateAddress.mutateAsync({ addressId: address.id, address: value })}
                onSuccess={close}
              />
            )}
          </FormDialog>
          <RemoveDialog
            title='Удаление адреса'
            description={`Адрес «${address.address}» будет удалён`}
            ariaLabel='Удалить адрес'
            onConfirm={() => removeAddress.mutateAsync(address.id)}
          />
        </>
      ),
    },
  ];

  return (
    <FormDialog
      trigger={{ text: 'Адреса', trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title='Адреса заведения'
      description='Управление адресами заведения'
      contentClassName='sm:max-w-2xl w-full'
    >
      <>
        <AddressForm submitLabel='Добавить' onSubmit={value => addAddress.mutateAsync(value)} />
        <EntityTable
          items={addresses}
          columns={columns}
          getRowKey={address => address.id}
          emptyMessage='Адреса не заданы'
        />
      </>
    </FormDialog>
  );
};
