'use client';

import { type FC } from 'react';
import { PencilIcon } from 'lucide-react';
import { FormDialog } from '@/common/forms';
import { Establishment } from '../types';
import { EstablishmentForm } from './establishment-form';

type UpdateEstablishmentDialogProps = {
  establishment: Establishment;
};

export const UpdateEstablishmentDialog: FC<UpdateEstablishmentDialogProps> = ({ establishment }) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать заведение' }}
      title='Обновление заведения'
      description='Измените данные заведения'
    >
      {close => <EstablishmentForm establishment={establishment} onSuccess={close} />}
    </FormDialog>
  );
};
