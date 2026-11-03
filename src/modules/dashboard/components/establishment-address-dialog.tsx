'use client';

import { FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/common/components';
import { Establishment } from '../types';
import { EstablishmentAddressForm } from './establishment-address-form';

type EstablishmentAddressDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  establishment: Establishment;
};

export const EstablishmentAddressDialog: FC<EstablishmentAddressDialogProps> = ({
  open,
  onOpenChange,
  establishment,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Добавить адрес</DialogTitle>
          <DialogDescription>Укажите новый адрес заведения «{establishment.name}».</DialogDescription>
        </DialogHeader>
        {open && <EstablishmentAddressForm establishment={establishment} onSuccess={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
};
