'use client';

import type { Specification } from '@/common/api';
import { type EntityColumn, EntityTable, RemoveDialog, UpdateNamedEntityDialog } from '@/common/crud';
import { useDeleteSpecification, useUpdateSpecification } from '../hooks/mutations';
import { useSpecifications } from '../hooks/queries';
import { specificationTexts } from '../texts';

export const SystemSpecificationsTable = () => {
  const { data: specifications, isLoading } = useSpecifications();
  const updateSpecification = useUpdateSpecification();
  const deleteSpecification = useDeleteSpecification();

  const columns: EntityColumn<Specification>[] = [
    {
      header: 'Название',
      className: 'w-48',
      cell: specification => specification.name,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: specification => (
        <>
          <UpdateNamedEntityDialog
            entity={specification}
            texts={specificationTexts}
            onSave={name => updateSpecification.mutateAsync({ id: specification.id, name })}
          />
          <RemoveDialog
            title='Удаление характеристики'
            description={`Характеристика «${specification.name}» будет удалена`}
            ariaLabel='Удалить характеристику'
            onConfirm={() => deleteSpecification.mutateAsync(specification.id)}
          />
        </>
      ),
    },
  ];

  return (
    <EntityTable
      items={specifications ?? []}
      columns={columns}
      getRowKey={specification => specification.id}
      isLoading={isLoading}
      emptyMessage='Характеристики не найдены'
    />
  );
};
