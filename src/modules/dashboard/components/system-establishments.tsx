'use client';

import { FC, useState } from 'react';
import { MapPinIcon, PencilIcon, PlusIcon, ShieldAlertIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components';
import { useEstablishments } from '../hooks/useEstablishments';
import { Establishment } from '../types';
import { EstablishmentAddressesPopover } from './establishment-addresses-popover';
import { EstablishmentDialog } from './establishment-dialog';
import { RolesState } from './roles-state';

export const SystemEstablishments: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEstablishment, setEditingEstablishment] = useState<Establishment>();
  const { data: establishments, isPending, isError, refetch } = useEstablishments();

  const openCreateDialog = () => {
    setEditingEstablishment(undefined);
    setIsDialogOpen(true);
  };

  const openEditDialog = (establishment: Establishment) => {
    setEditingEstablishment(establishment);
    setIsDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (!open) {
      setEditingEstablishment(undefined);
    }
  };

  if (isPending) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-36 rounded-4xl' />
        </div>

        <div className='overflow-hidden rounded-2xl border bg-card'>
          <Table className='table-fixed'>
            <TableHeader>
              <TableRow>
                <TableHead className='w-1/4'>
                  <Skeleton className='h-4 w-24' />
                </TableHead>
                <TableHead className='w-1/4'>
                  <Skeleton className='h-4 w-28' />
                </TableHead>
                <TableHead className='w-1/4'>
                  <Skeleton className='h-4 w-16' />
                </TableHead>
                <TableHead className='w-1/4'>
                  <Skeleton className='h-4 w-16' />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Skeleton className='size-8 shrink-0 rounded-full' />
                      <Skeleton className='h-4 w-32' />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-40' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-6 w-20 rounded-4xl' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='ml-auto size-8 rounded-full' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <RolesState
        icon={ShieldAlertIcon}
        tone='destructive'
        title='Не удалось загрузить заведения'
        description='Попробуйте повторить запрос.'
        action={{ label: 'Повторить', onClick: () => refetch(), variant: 'outline' }}
      />
    );
  }

  if (!establishments) {
    return (
      <RolesState
        icon={ShieldAlertIcon}
        title='Недостаточно прав'
        description='У вас нет доступа к списку заведений.'
      />
    );
  }

  return (
    <>
      {establishments.length === 0 ? (
        <RolesState
          icon={MapPinIcon}
          title='Заведений пока нет'
          description='Создайте первое заведение партнёра.'
          action={{ label: 'Создать заведение', onClick: openCreateDialog, icon: PlusIcon }}
        />
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary'>Заведений: {establishments.length}</Badge>
          </div>

          <div className='overflow-hidden rounded-2xl border bg-card'>
            <Table className='table-fixed'>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-1/4'>Заведение</TableHead>
                  <TableHead className='w-1/4'>Бизнес-счёт</TableHead>
                  <TableHead className='w-1/4'>Адреса</TableHead>
                  <TableHead className='w-1/4'>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {establishments.map(establishment => (
                  <TableRow key={establishment.id}>
                    <TableCell className='font-medium'>
                      <div className='flex min-w-0 items-center gap-3'>
                        <Avatar>
                          <AvatarFallback>
                            <MapPinIcon className='size-4' />
                          </AvatarFallback>
                        </Avatar>
                        <span className='truncate'>{establishment.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className='font-mono text-muted-foreground'>
                      <span className='block truncate'>{establishment.businessAccount}</span>
                    </TableCell>
                    <TableCell>
                      <EstablishmentAddressesPopover establishment={establishment} />
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button
                        variant='ghost'
                        size='icon-sm'
                        aria-label={`Редактировать ${establishment.name}`}
                        title='Редактировать заведение'
                        onClick={() => openEditDialog(establishment)}
                      >
                        <PencilIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='flex justify-end'>
            <Button onClick={openCreateDialog}>
              <PlusIcon />
              Создать заведение
            </Button>
          </div>
        </div>
      )}

      <EstablishmentDialog
        open={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        establishment={editingEstablishment}
      />
    </>
  );
};
