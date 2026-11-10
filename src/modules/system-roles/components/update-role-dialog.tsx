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
import { Role } from '@/modules/store-auth';
import { UpdateRoleForm } from './update-role-form';

type UpdateRoleDialogProps = {
  role: Role;
};

export const UpdateRoleDialog: FC<UpdateRoleDialogProps> = ({ role }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant='ghost' aria-label='Редактировать роль' title='Редактировать роль' />}>
        <PencilIcon />
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Обновление роли</DialogTitle>
          <DialogDescription>Измените название роли</DialogDescription>
        </DialogHeader>
        <UpdateRoleForm role={role} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
