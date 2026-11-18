'use client';

import { ActionsBar, CreateNamedEntityDialog } from '@/common/crud';
import { useCreateCategory } from '../hooks/mutations';
import { useCategories } from '../hooks/queries';
import { categoryTexts } from '../texts';

export const SystemCategoriesActions = () => {
  const { isLoading } = useCategories();
  const createCategory = useCreateCategory();

  return (
    <ActionsBar isLoading={isLoading}>
      <CreateNamedEntityDialog texts={categoryTexts} onSave={name => createCategory.mutateAsync({ name })} />
    </ActionsBar>
  );
};
