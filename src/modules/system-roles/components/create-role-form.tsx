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
import { useCreateRole } from '../hooks/useCreateRole';

const roleFormSchema = z.object({
  name: z.string().trim().min(1, 'Название роли не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type RoleFormSchema = z.infer<typeof roleFormSchema>;

type CreateRoleFormProps = {
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

  return 'Не удалось создать роль, попробуйте снова позже';
};

export const CreateRoleForm: FC<CreateRoleFormProps> = ({ onSuccess }) => {
  const createRole = useCreateRole();

  const form = useForm({
    defaultValues: {
      name: '',
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
        await createRole.mutateAsync({ name: value.name.trim() });
        form.reset();
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
                <FieldLabel htmlFor='role_name'>Название роли</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <UserShieldIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='role_name'
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
              Создать роль
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};
