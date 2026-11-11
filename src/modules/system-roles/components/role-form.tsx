'use client';

import { type FC } from 'react';
import { UserShieldIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { type Role } from '@/common/api';
import { FieldGroup } from '@/common/components';
import {
  clearServerErrors,
  FormShell,
  getServerErrorMessage,
  setServerError,
  SubmitButton,
  TextField,
} from '@/common/forms';
import { useCreateRole, useUpdateRole } from '../hooks/mutations';

const roleFormSchema = z.object({
  name: z.string().trim().min(1, 'Название роли не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type RoleFormSchema = z.infer<typeof roleFormSchema>;

type RoleFormProps = {
  role?: Role;
  onSuccess?: () => void;
};

export const RoleForm: FC<RoleFormProps> = ({ role, onSuccess }) => {
  const isEdit = role !== undefined;
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();

  const form = useForm({
    defaultValues: {
      name: role?.name ?? '',
    } as RoleFormSchema,
    validators: {
      onChange: roleFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      try {
        if (role) {
          await updateRole.mutateAsync({ id: role.id, name: value.name.trim() });
        } else {
          await createRole.mutateAsync({ name: value.name.trim() });
          form.reset();
        }

        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: 'Роль с таким названием уже существует' },
            isEdit
              ? 'Не удалось обновить роль, попробуйте снова позже'
              : 'Не удалось создать роль, попробуйте снова позже',
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='name' label='Название роли' icon={UserShieldIcon} autoComplete='off' />
        <SubmitButton form={form} className='w-full'>
          {isEdit ? 'Обновить роль' : 'Создать роль'}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
