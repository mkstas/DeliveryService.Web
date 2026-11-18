'use client';

import { ChevronDownIcon } from 'lucide-react';
import type { Restaurant, RestaurantAddress } from '@/common/api';
import { type EntityColumn, EntityTable, RemoveDialog } from '@/common/crud';
import { FormDialog } from '@/common/forms';
import { useRemoveRestaurantAddress } from '../hooks/mutations';
import { AddRestaurantAddressForm } from './add-restaurant-address-form';
import { UpdateRestaurantAddressDialog } from './update-restaurant-address-dialog';

type RestaurantAddressesDialogProps = {
  restaurant: Restaurant;
};

export const RestaurantAddressesDialog = ({ restaurant }: RestaurantAddressesDialogProps) => {
  const removeRestaurantAddress = useRemoveRestaurantAddress();

  const columns: EntityColumn<RestaurantAddress>[] = [
    {
      header: 'Адрес',
      cell: address => address.address,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: address => (
        <>
          <UpdateRestaurantAddressDialog restaurantId={restaurant.id} address={address} />
          <RemoveDialog
            title='Удаление адреса'
            description={`Адрес «${address.address}» будет удалён`}
            ariaLabel='Удалить адрес'
            onConfirm={() =>
              removeRestaurantAddress.mutateAsync({ restaurantId: restaurant.id, addressId: address.id })
            }
          />
        </>
      ),
    },
  ];

  return (
    <FormDialog
      trigger={{ text: 'Адреса', trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title='Адреса ресторана'
      description='Управление адресами ресторана'
      contentClassName='sm:max-w-2xl w-full'
    >
      <>
        <AddRestaurantAddressForm restaurantId={restaurant.id} />
        <EntityTable
          items={restaurant.addresses}
          columns={columns}
          getRowKey={address => address.id}
          emptyMessage='Адреса не найдены'
        />
      </>
    </FormDialog>
  );
};
