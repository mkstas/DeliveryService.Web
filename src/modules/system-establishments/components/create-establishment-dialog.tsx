'use client';

import { type FC } from 'react';
import { PlusIcon } from 'lucide-react';
import { FormDialog } from '@/common/forms';
import { EstablishmentForm } from './establishment-form';

export const CreateEstablishmentDialog: FC = () => {
  return (
    <FormDialog
      trigger={{ icon: PlusIcon, text: 'Создать заведение' }}
      title='Создание заведения'
      description='Укажите данные заведения'
    >
      {close => <EstablishmentForm onSuccess={close} />}
    </FormDialog>
  );
};
