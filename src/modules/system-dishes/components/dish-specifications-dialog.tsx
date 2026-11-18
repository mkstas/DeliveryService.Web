'use client';

import { ChevronDownIcon } from 'lucide-react';
import type { Dish, DishSpecification } from '@/common/api';
import { type EntityColumn, EntityTable, RemoveDialog } from '@/common/crud';
import { FormDialog } from '@/common/forms';
import { useSpecifications } from '@/modules/system-specifications';
import { useDeleteDishSpecification } from '../hooks/mutations';
import { AddDishSpecificationForm } from './add-dish-specification-form';
import { UpdateDishSpecificationDialog } from './update-dish-specification-dialog';

type DishSpecificationsDialogProps = {
  dish: Dish;
};

export const DishSpecificationsDialog = ({ dish }: DishSpecificationsDialogProps) => {
  const { data: specifications } = useSpecifications();
  const deleteDishSpecification = useDeleteDishSpecification();

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
          <UpdateDishSpecificationDialog specification={specification} />
          <RemoveDialog
            title='Удаление характеристики'
            description='Характеристика будет удалена у блюда'
            ariaLabel='Удалить характеристику'
            onConfirm={() => deleteDishSpecification.mutateAsync(specification.id)}
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
        <AddDishSpecificationForm dishId={dish.id} />
        <EntityTable
          items={dish.specifications}
          columns={columns}
          getRowKey={specification => specification.id}
          emptyMessage='Характеристики не найдены'
        />
      </>
    </FormDialog>
  );
};
