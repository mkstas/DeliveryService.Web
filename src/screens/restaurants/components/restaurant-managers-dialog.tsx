'use client';

import { type EntityColumn, EntityTable, RemoveDialog } from '@/features/crud';
import { FormDialog } from '@/features/form';
import type { Restaurant, RestaurantUser } from '@/shared/api';
import { UserCell } from '@/shared/ui';
import { ChevronDownIcon } from 'lucide-react';
import { useRemoveRestaurantUser } from '../hooks/mutations';
import { AddRestaurantManagerForm } from './add-restaurant-manager-form';

type RestaurantManagersDialogProps = {
  restaurant: Restaurant;
};

export const RestaurantManagersDialog = ({ restaurant }: RestaurantManagersDialogProps) => {
  const removeRestaurantUser = useRemoveRestaurantUser();

  const columns: EntityColumn<RestaurantUser>[] = [
    {
      header: 'Имя пользователя',
      className: 'w-48',
      cell: user => <UserCell imageUrl={user.imageUrl} name={user.name} />,
    },
    {
      header: 'Электронная почта',
      className: 'w-48',
      cell: user => <span>{user.emailAddress}</span>,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex justify-end gap-2',
      cell: user => (
        <RemoveDialog
          title='Удаление менеджера'
          description={`Менеджер «${user.name}» будет откреплён от ресторана`}
          ariaLabel='Удалить менеджера'
          onConfirm={() => removeRestaurantUser.mutateAsync({ restaurantId: restaurant.id, userId: user.id })}
        />
      ),
    },
  ];

  return (
    <FormDialog
      trigger={{ text: 'Менеджеры', trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title='Менеджеры ресторана'
      description='Управление списком менеджеров ресторана'
      contentClassName='sm:max-w-2xl w-full'
    >
      <>
        <AddRestaurantManagerForm restaurantId={restaurant.id} />
        <EntityTable
          items={restaurant.users}
          columns={columns}
          getRowKey={user => user.id}
          emptyMessage='Менеджеры не найдены'
        />
      </>
    </FormDialog>
  );
};
