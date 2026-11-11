'use client';

import { type FC } from 'react';
import { CreditCardIcon, MapPinIcon } from 'lucide-react';
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
import { useCreateEstablishment, useUpdateEstablishment } from '../hooks/mutations';
import { Establishment } from '../types';

const establishmentFormSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
  businessAccount: z.string().trim().length(20, 'Номер должень быть длиной 20 цифр'),
});

type EstablishmentFormSchema = z.infer<typeof establishmentFormSchema>;

type EstablishmentFormProps = {
  establishment?: Establishment;
  onSuccess?: () => void;
};

export const EstablishmentForm: FC<EstablishmentFormProps> = ({ establishment, onSuccess }) => {
  const isEdit = establishment !== undefined;
  const createEstablishment = useCreateEstablishment();
  const updateEstablishment = useUpdateEstablishment();

  const form = useForm({
    defaultValues: {
      name: establishment?.name ?? '',
      businessAccount: establishment?.businessAccount ?? '',
    } as EstablishmentFormSchema,
    validators: {
      onChange: establishmentFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      try {
        if (establishment) {
          await updateEstablishment.mutateAsync({
            id: establishment.id,
            name: value.name.trim(),
            businessAccount: value.businessAccount,
          });
        } else {
          await createEstablishment.mutateAsync({ name: value.name.trim(), businessAccount: value.businessAccount });
          form.reset();
        }

        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: 'Заведение уже существует' },
            isEdit
              ? 'Не удалось обновить заведение, попробуйте снова позже'
              : 'Не удалось создать заведение, попробуйте снова позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='name' label='Название заведения' icon={MapPinIcon} autoComplete='off' />
        <TextField
          form={form}
          name='businessAccount'
          label='Банковский счет'
          icon={CreditCardIcon}
          autoComplete='off'
        />
        <SubmitButton form={form} className='w-full'>
          {isEdit ? 'Обновить заведение' : 'Создать заведение'}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
