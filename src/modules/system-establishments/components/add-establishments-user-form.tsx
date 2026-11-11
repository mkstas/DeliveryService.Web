'use client';

import { type FC } from 'react';
import { MailIcon } from 'lucide-react';
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
import { useAddEstablishmentUser } from '../hooks/mutations';

const addEstablishmentUserFormSchema = z.object({
  emailAddress: z.email('Неверный формат эл. почты').max(254, 'Максимальная длина 254 символа'),
});

type AddEstablishmentUserFormSchema = z.infer<typeof addEstablishmentUserFormSchema>;

type AddEstablishmentUserFormProps = {
  establishmentId: string;
};

export const AddEstablishmentUserForm: FC<AddEstablishmentUserFormProps> = ({ establishmentId }) => {
  const addEstablishmentUser = useAddEstablishmentUser();

  const form = useForm({
    defaultValues: {
      emailAddress: '',
    } as AddEstablishmentUserFormSchema,
    validators: {
      onChange: addEstablishmentUserFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['emailAddress']);

      try {
        await addEstablishmentUser.mutateAsync({ establishmentId, emailAddress: value.emailAddress });
        form.reset();
      } catch (error) {
        setServerError(
          form,
          'emailAddress',
          getServerErrorMessage(
            error,
            { 404: 'Пользователь не найден' },
            'Не удалось добавить менеджера, попробуйте снова позже',
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
