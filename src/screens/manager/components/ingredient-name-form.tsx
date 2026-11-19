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
import { LeafyGreenIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

const ingredientFormSchema = z.object({
  name: z.string().trim().min(1, 'Название не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type IngredientFormSchema = z.infer<typeof ingredientFormSchema>;

type IngredientNameFormProps = {
  initialName?: string;
  submitLabel: string;
  onSubmit: (name: string) => Promise<void>;
  onSuccess?: () => void;
};

export const IngredientNameForm: FC<IngredientNameFormProps> = ({
  initialName = '',
  submitLabel,
  onSubmit,
  onSuccess,
}) => {
  const form = useForm({
    defaultValues: { name: initialName } as IngredientFormSchema,
    validators: { onChange: ingredientFormSchema },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['name']);

      try {
        await onSubmit(value.name.trim());
        form.reset();
        onSuccess?.();
      } catch (error) {
        setServerError(
          form,
          'name',
          getServerErrorMessage(
            error,
            { 409: 'Ингредиент с таким названием уже существует' },
            'Не удалось сохранить ингредиент, попробуйте позже',
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
          name='name'
          icon={LeafyGreenIcon}
          autoComplete='off'
          placeholder='Название ингредиента'
        />
        <SubmitButton form={form} className='max-sm:w-full'>
          {submitLabel}
        </SubmitButton>
      </FieldGroup>
    </FormShell>
  );
};
