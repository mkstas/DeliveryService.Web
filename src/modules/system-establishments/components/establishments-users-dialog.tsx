import { FC, useState } from 'react';
import { ChevronDownIcon, TrashIcon, UserIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components';
import { getUserImageUrl } from '@/common/config';
import { useRemoveEstablishmentUser } from '../hooks/useRemoveEstablishmentUser';
import { Establishment } from '../types';
import { AddEstablishmentUserForm } from './add-establishments-user-form';

type EstablishmentUsersDialogProps = {
  establishment: Establishment;
};

export const EstablishmentUsersDialog: FC<EstablishmentUsersDialogProps> = ({ establishment }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const removeEstablishmentUser = useRemoveEstablishmentUser();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant='secondary' />}>
        Менеджеры <ChevronDownIcon className='text-muted-foreground' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl w-full'>
        <DialogHeader>
          <DialogTitle>Менеджеры заведения</DialogTitle>
          <DialogDescription>Управление списком менеджеров заведения</DialogDescription>
        </DialogHeader>
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
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        {user.imageUrl && (
                          <AvatarImage src={getUserImageUrl(user.imageUrl)} alt={`Аватар ${user.name}`} />
                        )}
                        <AvatarFallback>
                          <UserIcon className='size-4' />
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
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
      </DialogContent>
    </Dialog>
  );
};
