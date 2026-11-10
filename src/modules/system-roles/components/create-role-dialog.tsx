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
import { CreateRoleForm } from './create-role-form';

export const CreateRoleDialog: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <PlusIcon />
        Создать роль
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Создание роли</DialogTitle>
          <DialogDescription>Укажите название новой роли</DialogDescription>
        </DialogHeader>
        <CreateRoleForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
