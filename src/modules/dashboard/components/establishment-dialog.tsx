'use client';

import { FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/common/components';
import { Establishment } from '../types';
import { EstablishmentForm } from './establishment-form';

type EstablishmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  establishment?: Establishment;
};

export const EstablishmentDialog: FC<EstablishmentDialogProps> = ({ open, onOpenChange, establishment }) => {
  const isEditing = !!establishment;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Редактировать заведение' : 'Создать заведение'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Измените данные заведения.' : 'Укажите название и бизнес-счёт нового заведения.'}
          </DialogDescription>
        </DialogHeader>
        {open && <EstablishmentForm establishment={establishment} onSuccess={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
};
