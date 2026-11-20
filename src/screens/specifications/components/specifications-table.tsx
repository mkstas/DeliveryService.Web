'use client';

import { type EntityColumn, EntityTable, PaginationControls, RemoveDialog, UpdateNamedEntityDialog } from '@/features/crud';
import type { Specification } from '@/shared/api';
import { useClampPage, useScreenPagination } from '@/shared/lib/hooks';
import { useDeleteSpecification, useUpdateSpecification } from '../hooks/mutations';
import { usePagedSpecifications } from '../hooks/queries';
import { specificationTexts } from '../texts';

export const SpecificationsTable = ({ search }: { search?: string }) => {
  const { page, setPage } = useScreenPagination(search);
  const { data, isLoading } = usePagedSpecifications(search, page);
  const updateSpecification = useUpdateSpecification();
  const deleteSpecification = useDeleteSpecification();

  useClampPage(page, setPage, data?.totalPages ?? 0);

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
    <>
      <EntityTable
        items={data?.items ?? []}
        columns={columns}
        getRowKey={specification => specification.id}
        isLoading={isLoading}
        emptyMessage='Характеристики не найдены'
      />
      <PaginationControls
        page={page}
        totalPages={data?.totalPages ?? 0}
        totalCount={data?.totalCount}
        onPageChange={setPage}
      />
    </>
  );
};
