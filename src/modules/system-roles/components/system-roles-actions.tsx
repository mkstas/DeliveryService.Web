import { FC } from 'react';
import { CreateRoleDialog } from './create-role-dialog';

export const SystemRolesActions: FC = () => {
  return (
    <div className='flex justify-end gap-2'>
      <CreateRoleDialog />
    </div>
  );
};
