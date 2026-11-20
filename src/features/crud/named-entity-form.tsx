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
import { type LucideIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

const namedEntityFormSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type NamedEntityFormSchema = z.infer<typeof namedEntityFormSchema>;

export type NamedEntity = {
  id: string;
  name: string;
};

export type NamedEntityTexts = {
  icon: LucideIcon;
  label: string;
  entityName: string;
  conflictMessage: string;
  createTriggerText: string;
  createTitle: string;
  createDescription: string;
  updateTitle: string;
  updateDescription: string;
  editAriaLabel: string;
};

type NamedEntityFormProps<T extends NamedEntity> = {
  entity?: T;
  texts: NamedEntityTexts;
  onSave: (name: string) => Promise<void>;
  onSuccess?: () => void;
};

export function NamedEntityForm<T extends NamedEntity>({ entity, texts, onSave, onSuccess }: NamedEntityFormProps<T>) {
  const isEdit = entity !== undefined;
  const { icon: Icon, label, entityName, conflictMessage } = texts;

  const form = useForm({
    defaultValues: {
      name: entity?.name ?? '',
    } as NamedEntityFormSchema,
    validators: {
      onChange: namedEntityFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      try {
        await onSave(value.name.trim());

        if (!isEdit) {
          form.reset();
        }

        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: conflictMessage },
            isEdit
              ? `Не удалось обновить ${entityName}, попробуйте позже`
              : `Не удалось создать ${entityName}, попробуйте позже`,
          ),
        );
      }
    },
  });

  return (
    <FormShell form={form}>
      <FieldGroup>
        <TextField form={form} name='name' label={label} icon={Icon} placeholder={label} autoComplete='off' />
        <SubmitButton form={form} className='w-full'>
          {isEdit ? `Обновить ${entityName}` : `Создать ${entityName}`}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
}
