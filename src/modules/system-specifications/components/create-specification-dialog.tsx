'use client';

import { type FC } from 'react';
import { PlusIcon } from 'lucide-react';
import { FormDialog } from '@/common/forms';
import { SpecificationForm } from './specification-form';

export const CreateSpecificationDialog: FC = () => {
  return (
    <FormDialog
      trigger={{ icon: PlusIcon, text: 'Создать характеристику' }}
      title='Создание характеристики'
      description='Укажите название новой характеристики'
    >
      {close => <SpecificationForm onSuccess={close} />}
    </FormDialog>
  );
};
