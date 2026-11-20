'use client';

import { type EntityColumn, EntityTable, PaginationControls, RemoveDialog, UpdateNamedEntityDialog } from '@/features/crud';
import type { Category } from '@/shared/api';
import { useClampPage, useScreenPagination } from '@/shared/lib/hooks';
import { useDeleteCategory, useUpdateCategory } from '../hooks/mutations';
import { usePagedCategories } from '../hooks/queries';
import { categoryTexts } from '../texts';

export const CategoriesTable = ({ search }: { search?: string }) => {
  const { page, setPage } = useScreenPagination(search);
  const { data, isLoading } = usePagedCategories(search, page);
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  useClampPage(page, setPage, data?.totalPages ?? 0);

  const columns: EntityColumn<Category>[] = [
    {
      header: 'Название',
      className: 'w-48',
      cell: category => category.name,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: category => (
        <>
          <UpdateNamedEntityDialog
            entity={category}
            texts={categoryTexts}
            onSave={name => updateCategory.mutateAsync({ id: category.id, name })}
          />
          <RemoveDialog
            title='Удаление категории'
            description={`Категория «${category.name}» будет удалена`}
            ariaLabel='Удалить категорию'
            onConfirm={() => deleteCategory.mutateAsync(category.id)}
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
        getRowKey={category => category.id}
        isLoading={isLoading}
        emptyMessage='Категории не найдены'
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
