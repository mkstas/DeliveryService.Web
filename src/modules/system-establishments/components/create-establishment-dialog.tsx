'use client';

import { FC, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components';
import { CreateEstablishmentForm } from './create-establishment-form';

export const CreateEstablishmentDialog: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <PlusIcon />
        Создать заведение
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Создание заведения</DialogTitle>
          <DialogDescription>Укажите данные заведения</DialogDescription>
        </DialogHeader>
        <CreateEstablishmentForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
