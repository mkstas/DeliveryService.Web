'use client';

import { FC, useState } from 'react';
import { ChevronDownIcon, MapPinIcon, PlusIcon } from 'lucide-react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/common/components';
import { Establishment } from '../types';
import { EstablishmentAddressDialog } from './establishment-address-dialog';

type EstablishmentAddressesPopoverProps = {
  establishment: Establishment;
};

export const EstablishmentAddressesPopover: FC<EstablishmentAddressesPopoverProps> = ({ establishment }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openAddDialog = () => {
    setIsPopoverOpen(false);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger render={<Button variant='outline' size='xs' />}>
          Адреса
          <ChevronDownIcon className='text-muted-foreground' />
        </PopoverTrigger>

        <PopoverContent align='start' className='w-72'>
          <PopoverHeader>
            <PopoverTitle>Адреса заведения</PopoverTitle>
            <PopoverDescription>{establishment.name}</PopoverDescription>
          </PopoverHeader>

          {establishment.addresses.length === 0 ? (
            <p className='text-sm text-muted-foreground'>У заведения пока нет адресов</p>
          ) : (
            <div className='flex flex-col gap-1'>
              {establishment.addresses.map(address => (
                <div
                  key={address.id}
                  className='flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted/50'
                >
                  <MapPinIcon className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
                  <span className='min-w-0 flex-1 break-words'>{address.address}</span>
                </div>
              ))}
            </div>
          )}

          <Button variant='outline' size='sm' onClick={openAddDialog}>
            <PlusIcon />
            Добавить адрес
          </Button>
        </PopoverContent>
      </Popover>

      <EstablishmentAddressDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} establishment={establishment} />
    </>
  );
};
