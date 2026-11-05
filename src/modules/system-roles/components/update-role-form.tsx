'use client';

import { FC } from 'react';
import { UserShieldIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { HttpError } from '@/common/api';
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
import { Role } from '@/modules/store-auth';
import { useUpdateRole } from '../hooks/useUpdateRole';

const roleFormSchema = z.object({
  name: z.string().trim().min(1, 'Название роли не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type RoleFormSchema = z.infer<typeof roleFormSchema>;

type UpdateRoleFormProps = {
  role: Role;
  onSuccess?: () => void;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 409) {
      return 'Роль с таким названием уже существует';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Не удалось обновить роль, попробуйте снова позже';
};

export const UpdateRoleForm: FC<UpdateRoleFormProps> = ({ role, onSuccess }) => {
  const updateRole = useUpdateRole();

  const form = useForm({
    defaultValues: {
      name: role.name,
    } as RoleFormSchema,
    validators: {
      onChange: roleFormSchema,
    },
    onSubmit: async ({ value }) => {
      form.setFieldMeta('name', prev => ({
        ...prev,
        errorMap: { ...prev.errorMap, onServer: undefined },
      }));

      try {
        await updateRole.mutateAsync({ id: role.id, name: value.name.trim() });
        onSuccess?.();
      } catch (error) {
        form.setFieldMeta('name', prev => ({
          ...prev,
          errorMap: { ...prev.errorMap, onServer: [{ message: getErrorMessage(error) }] },
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
                <FieldLabel htmlFor='update_role_name'>Название роли</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <UserShieldIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='update_role_name'
                    type='text'
                    autoComplete='off'
                    aria-invalid={isError}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </InputGroup>
                {isError && <FieldError errors={field.state.meta.errors.slice(0, 1)} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={state => state.isSubmitting}>
          {isSubmitting => (
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              Обновить роль
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
