'use client';

import { type FC } from 'react';
import { PlusIcon } from 'lucide-react';
import { FormDialog } from '@/common/forms';
import { CategoryForm } from './category-form';

export const CreateCategoryDialog: FC = () => {
  return (
    <FormDialog
      trigger={{ icon: PlusIcon, text: 'Создать категорию' }}
      title='Создание категории'
      description='Укажите название новой категории'
    >
      {close => <CategoryForm onSuccess={close} />}
    </FormDialog>
  );
};
