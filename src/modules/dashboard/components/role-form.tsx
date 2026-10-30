'use client';

import { FC } from 'react';
import { UserShieldIcon } from 'lucide-react';
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
import { useCreateRole } from '../hooks/useCreateRole';
import { useUpdateRole } from '../hooks/useUpdateRole';
import { Role } from '../types';

const roleFormSchema = z.object({
  name: z.string().nonempty('Название роли не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type RoleFormSchema = z.infer<typeof roleFormSchema>;

type RoleFormProps = {
  role?: Role;
  onSuccess?: () => void;
};

const getErrorMessage = (error: unknown, isEditing: boolean): string => {
  if (error instanceof ApiError) {
    if (error.status === 409) {
      return 'Роль с таким названием уже существует';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return isEditing ? 'Ошибка сохранения роли, попробуйте снова позже' : 'Ошибка создания роли, попробуйте снова позже';
};

export const RoleForm: FC<RoleFormProps> = ({ role, onSuccess }) => {
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const isEditing = !!role;

  const form = useForm({
    defaultValues: {
      name: role?.name ?? '',
    } as RoleFormSchema,
    validators: {
      onChange: roleFormSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('name', prev => ({ ...prev, errorMap: { ...prev.errorMap, onServer: undefined } }));

      try {
        if (role) {
          await updateRole.mutateAsync({ id: role.id, data: value });
        } else {
          await createRole.mutateAsync(value);
          form.reset();
        }

        onSuccess?.();
      } catch (error) {
        const message = getErrorMessage(error, isEditing);

        form.setFieldMeta('name', prev => ({
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
                <FieldLabel htmlFor='role_name'>Название роли</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id='role_name'
                    type='text'
                    aria-invalid={isError}
                    placeholder='Менеджер'
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <InputGroupAddon>
                    <UserShieldIcon />
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
              {isEditing ? 'Сохранить' : 'Создать роль'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
