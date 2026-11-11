import { type FC } from 'react';
import { ChevronDownIcon, TrashIcon } from 'lucide-react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, UserCell } from '@/common/components';
import { FormDialog } from '@/common/forms';
import { useRemoveEstablishmentUser } from '../hooks/mutations';
import { Establishment } from '../types';
import { AddEstablishmentUserForm } from './add-establishments-user-form';

type EstablishmentUsersDialogProps = {
  establishment: Establishment;
};

export const EstablishmentUsersDialog: FC<EstablishmentUsersDialogProps> = ({ establishment }) => {
  const removeEstablishmentUser = useRemoveEstablishmentUser();

  return (
    <FormDialog
      trigger={{ text: 'Менеджеры', trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title='Менеджеры заведения'
      description='Управление списком менеджеров заведения'
      contentClassName='sm:max-w-2xl w-full'
    >
      <>
        <AddEstablishmentUserForm establishmentId={establishment.id} />
        <div className='border rounded-lg overflow-hidden'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-48'>Имя пользователя</TableHead>
                <TableHead className='w-48'>Электронная почта</TableHead>
                <TableHead className='text-right'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {establishment.users?.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <UserCell imageUrl={user.imageUrl} name={user.name} />
                  </TableCell>
                  <TableCell>
                    <span>{user.emailAddress}</span>
                  </TableCell>
                  <TableCell className='flex items-center gap-2 justify-end'>
                    <Button
                      variant='destructive'
                      onClick={() =>
                        removeEstablishmentUser.mutate({ establishmentId: establishment.id, userId: user.id })
                      }
                    >
                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    </FormDialog>
  );
};
