'use client';

import { type EntityColumn, EntityTable, RemoveDialog, UpdateNamedEntityDialog } from '@/features/crud';
import type { Category } from '@/shared/api';
import { useDeleteCategory, useUpdateCategory } from '../hooks/mutations';
import { useCategories } from '../hooks/queries';
import { categoryTexts } from '../texts';

export const CategoriesTable = ({ search }: { search?: string }) => {
  const { data: categories, isLoading } = useCategories(search);
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

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
    <EntityTable
      items={categories ?? []}
      columns={columns}
      getRowKey={category => category.id}
      isLoading={isLoading}
      emptyMessage='Категории не найдены'
    />
  );
};
