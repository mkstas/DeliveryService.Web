'use client';

import { type FC } from 'react';
import { ChevronDownIcon, TrashIcon } from 'lucide-react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/common/components';
import { FormDialog } from '@/common/forms';
import { useRemoveEstablishmentAddress } from '../hooks/mutations';
import { Establishment } from '../types';
import { AddEstablishmentAddressForm } from './add-establishment-address-form';

type EstablishmentAddressesDialogProps = {
  establishment: Establishment;
};

export const EstablishmentAddressesDialog: FC<EstablishmentAddressesDialogProps> = ({ establishment }) => {
  const removeEstablishmentAddress = useRemoveEstablishmentAddress();

  return (
    <FormDialog
      trigger={{ text: 'Адреса', trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title='Адреса заведения'
      description='Управление адресами заведения'
      contentClassName='sm:max-w-2xl w-full'
    >
      <>
        <AddEstablishmentAddressForm establishmentId={establishment.id} />
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Адрес</TableHead>
                <TableHead className='text-right'>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {establishment.addresses?.map(address => (
                <TableRow key={address.id}>
                  <TableCell>{address.address}</TableCell>
                  <TableCell className='flex items-center justify-end gap-2'>
                    <Button
                      variant='destructive'
                      disabled={removeEstablishmentAddress.isPending}
                      onClick={() =>
                        removeEstablishmentAddress.mutate({
                          establishmentId: establishment.id,
                          addressId: address.id,
                        })
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
