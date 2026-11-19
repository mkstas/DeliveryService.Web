'use client';

import { type EntityColumn, EntityTable, RemoveDialog, UpdateNamedEntityDialog } from '@/features/crud';
import type { NamedEntityTexts } from '@/features/crud';
import {
  clearServerErrors,
  FormDialog,
  FormShell,
  getServerErrorMessage,
  SelectField,
  setServerError,
  SubmitButton,
  TextField,
} from '@/features/form';
import { useSpecifications } from '@/screens/specifications';
import type { Dish, DishSpecification } from '@/shared/api';
import { FieldGroup } from '@/shared/ui';
import { type FC } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import {
  useCreateMyDishSpecification,
  useRemoveMyDishSpecification,
  useUpdateMyDishSpecification,
} from '../hooks/mutations';

const addSpecificationFormSchema = z.object({
  specificationId: z.string().min(1, 'Выберите характеристику'),
  value: z.string().trim().min(1, 'Значение не может быть пустым').max(256, 'Максимальная длина 256 символов'),
});

type AddSpecificationFormSchema = z.infer<typeof addSpecificationFormSchema>;

const specificationValueTexts: NamedEntityTexts = {
  icon: ChevronDownIcon,
  label: 'Значение',
  entityName: 'значение',
  conflictMessage: 'Такое значение уже указано',
  createTriggerText: 'Добавить',
  createTitle: 'Добавление значения',
  createDescription: 'Укажите значение характеристики',
  updateTitle: 'Изменение значения',
  updateDescription: 'Измените значение характеристики',
  editAriaLabel: 'Изменить значение',
};

const AddSpecificationForm: FC<{ dishId: string; usedSpecificationIds: string[] }> = ({
  dishId,
  usedSpecificationIds,
}) => {
  const createSpecification = useCreateMyDishSpecification();
  const { data: specifications } = useSpecifications();

  const availableSpecifications = (specifications ?? []).filter(
    specification => !usedSpecificationIds.includes(specification.id),
  );

  const form = useForm({
    defaultValues: {
      specificationId: '',
      value: '',
    } as AddSpecificationFormSchema,
    validators: {
      onChange: addSpecificationFormSchema,
    },
    onSubmit: async ({ value }) => {
      clearServerErrors(form, ['specificationId', 'value']);

      try {
        await createSpecification.mutateAsync({
          dishId,
          specificationId: value.specificationId,
          value: value.value.trim(),
        });
        form.reset();
      } catch (error) {
        setServerError(
          form,
          'value',
          getServerErrorMessage(
            error,
            { 409: 'Такая характеристика уже добавлена' },
            'Не удалось добавить характеристику',
          ),
        );
      }
    },
  });

  const hasAvailableSpecifications = availableSpecifications.length > 0;

  return (
    <div className='flex flex-col gap-2'>
      <FormShell form={form}>
        <FieldGroup className='sm:flex-row sm:items-start sm:gap-3'>
          <SelectField
            form={form}
            name='specificationId'
            options={availableSpecifications.map(specification => ({
              value: specification.id,
              label: specification.name,
            }))}
            placeholder='Выберите характеристику'
            disabled={!hasAvailableSpecifications}
          />
          <TextField form={form} name='value' placeholder='Значение' autoComplete='off' />
          <SubmitButton form={form} className='max-sm:w-full' disabled={!hasAvailableSpecifications}>
            Добавить
          </SubmitButton>
        </FieldGroup>
      </FormShell>
    </div>
  );
};

export const DishSpecificationsDialog: FC<{ dish: Dish }> = ({ dish }) => {
  const { data: specifications } = useSpecifications();
  const updateSpecification = useUpdateMyDishSpecification();
  const removeSpecification = useRemoveMyDishSpecification();

  const getSpecificationName = (specificationId: string) =>
    specifications?.find(specification => specification.id === specificationId)?.name ?? 'Характеристика';

  const columns: EntityColumn<DishSpecification>[] = [
    {
      header: 'Характеристика',
      cell: specification => getSpecificationName(specification.specificationId),
    },
    {
      header: 'Значение',
      cell: specification => specification.value,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: specification => (
        <>
          <UpdateNamedEntityDialog
            entity={{
              id: specification.id,
              name: specification.value,
            }}
            texts={specificationValueTexts}
            onSave={value => updateSpecification.mutateAsync({ id: specification.id, value })}
          />
          <RemoveDialog
            title='Удаление характеристики'
            description='Характеристика будет удалена у блюда'
            ariaLabel='Удалить характеристику'
            onConfirm={() => removeSpecification.mutateAsync(specification.id)}
          />
        </>
      ),
    },
  ];

  return (
    <FormDialog
      trigger={{ text: 'Характеристики', trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title='Характеристики блюда'
      description={dish.name}
      contentClassName='sm:max-w-3xl w-full'
    >
      <>
        <AddSpecificationForm
          dishId={dish.id}
          usedSpecificationIds={dish.specifications.map(specification => specification.specificationId)}
        />
        <EntityTable
          items={dish.specifications}
          columns={columns}
          getRowKey={specification => specification.id}
          emptyMessage='Характеристики не заданы'
        />
      </>
    </FormDialog>
  );
};
