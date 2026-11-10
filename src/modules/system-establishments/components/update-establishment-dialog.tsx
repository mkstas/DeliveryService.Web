'use client';

import { FC, useState } from 'react';
import { PencilIcon } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components';
import { Establishment } from '../types';
import { UpdateEstablishmentForm } from './update-establishment-form';

type UpdateEstablishmentDialogProps = {
  establishment: Establishment;
};

export const UpdateEstablishmentDialog: FC<UpdateEstablishmentDialogProps> = ({ establishment }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant='ghost' aria-label='Редактировать заведение' title='Редактировать заведение' />}
      >
        <PencilIcon />
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Обновление заведения</DialogTitle>
          <DialogDescription>Измените данные заведения</DialogDescription>
        </DialogHeader>
        <UpdateEstablishmentForm establishment={establishment} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
