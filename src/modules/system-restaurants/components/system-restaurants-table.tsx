'use client';

import { ImageIcon } from 'lucide-react';
import type { Restaurant } from '@/common/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/common/components';
import { getRestaurantImageUrl } from '@/common/config';
import { type EntityColumn, EntityTable } from '@/common/crud';
import { ImageUploadDialog } from '@/common/forms';
import { useRemoveRestaurantImage, useUploadRestaurantImage } from '../hooks/mutations';
import { useRestaurants } from '../hooks/queries';
import { RestaurantAddressesDialog } from './restaurant-addresses-dialog';
import { RestaurantIngredientsDialog } from './restaurant-ingredients-dialog';
import { RestaurantManagersDialog } from './restaurant-managers-dialog';
import { UpdateRestaurantDialog } from './update-restaurant-dialog';

export const SystemRestaurantsTable = () => {
  const { data: restaurants, isLoading } = useRestaurants();
  const uploadImage = useUploadRestaurantImage();
  const removeImage = useRemoveRestaurantImage();

  const columns: EntityColumn<Restaurant>[] = [
    {
      header: 'Название',
      className: 'w-48',
      cell: restaurant => (
        <div className='flex items-center gap-3'>
          <Avatar className='size-8 rounded-md after:rounded-md'>
            {restaurant.imageUrl && (
              <AvatarImage
                src={getRestaurantImageUrl(restaurant.imageUrl)}
                alt={restaurant.name}
                className='rounded-md'
              />
            )}
            <AvatarFallback className='rounded-md'>
              <ImageIcon className='size-4' />
            </AvatarFallback>
          </Avatar>
          <span>{restaurant.name}</span>
        </div>
      ),
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex items-center justify-end gap-2',
      cell: restaurant => (
        <>
          <RestaurantAddressesDialog restaurant={restaurant} />
          <RestaurantManagersDialog restaurant={restaurant} />
          <RestaurantIngredientsDialog restaurant={restaurant} />
          <ImageUploadDialog
            ariaLabel={`Загрузить изображение ресторана «${restaurant.name}»`}
            name={restaurant.name}
            imageUrl={restaurant.imageUrl}
            getImageUrl={getRestaurantImageUrl}
            onUpload={file => uploadImage.mutateAsync({ id: restaurant.id, file })}
            onRemove={() => removeImage.mutateAsync(restaurant.id)}
          />
          <UpdateRestaurantDialog restaurant={restaurant} />
        </>
      ),
    },
  ];

  return (
    <EntityTable
      items={restaurants ?? []}
      columns={columns}
      getRowKey={restaurant => restaurant.id}
      isLoading={isLoading}
      withAvatar
      avatarClassName='rounded-md'
      emptyMessage='Рестораны не найдены'
    />
  );
};
