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
import { MailIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useAddRestaurantUser } from '../hooks/mutations';

const addManagerFormSchema = z.object({
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
});

type AddManagerFormSchema = z.infer<typeof addManagerFormSchema>;

type AddRestaurantManagerFormProps = {
  restaurantId: string;
};

export const AddRestaurantManagerForm: FC<AddRestaurantManagerFormProps> = ({ restaurantId }) => {
  const addRestaurantUser = useAddRestaurantUser();

  const form = useForm({
    defaultValues: {
      emailAddress: '',
    } as AddManagerFormSchema,
    validators: {
      onChange: addManagerFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['emailAddress']);

      try {
        await addRestaurantUser.mutateAsync({ restaurantId, emailAddress: value.emailAddress.trim() });
        form.reset();
      } catch (error) {
        setServerError(
          form,
          'emailAddress',
          getServerErrorMessage(
            error,
            { 404: 'Пользователь не найден' },
            'Не удалось добавить менеджера, попробуйте позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup className='sm:flex-row sm:items-start sm:gap-3'>
        <TextField
          form={form}
          name='emailAddress'
          icon={MailIcon}
          type='email'
          autoComplete='email'
          placeholder='эл. почта менеджера'
        />
        <SubmitButton form={form} className='max-sm:w-full'>
          Добавить
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
