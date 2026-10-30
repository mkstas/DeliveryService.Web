'use client';

import { FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/common/components';
import { Role } from '../types';
import { RoleForm } from './role-form';

type RoleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: Role;
};

export const RoleDialog: FC<RoleDialogProps> = ({ open, onOpenChange, role }) => {
  const isEditing = !!role;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Редактировать роль' : 'Создать роль'}</DialogTitle>
          <DialogDescription>{isEditing ? 'Измените название роли.' : 'Укажите название новой роли'}</DialogDescription>
        </DialogHeader>
        {open && <RoleForm role={role} onSuccess={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
};
