'use client';

import { type FC } from 'react';
import { PencilIcon } from 'lucide-react';
import { type Category } from '@/common/api';
import { FormDialog } from '@/common/forms';
import { CategoryForm } from './category-form';

type UpdateCategoryDialogProps = {
  category: Category;
};

export const UpdateCategoryDialog: FC<UpdateCategoryDialogProps> = ({ category }) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать категорию' }}
      title='Обновление категории'
      description='Измените название категории'
    >
      {close => <CategoryForm category={category} onSuccess={close} />}
    </FormDialog>
  );
};
