'use client';

import { type FC } from 'react';
import { PencilIcon } from 'lucide-react';
import { type Specification } from '@/common/api';
import { FormDialog } from '@/common/forms';
import { SpecificationForm } from './specification-form';

type UpdateSpecificationDialogProps = {
  specification: Specification;
};

export const UpdateSpecificationDialog: FC<UpdateSpecificationDialogProps> = ({ specification }) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: 'Редактировать характеристику' }}
      title='Обновление характеристики'
      description='Измените название характеристики'
    >
      {close => <SpecificationForm specification={specification} onSuccess={close} />}
    </FormDialog>
  );
};
