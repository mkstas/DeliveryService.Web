'use client';

import { type EntityColumn, EntityTable, PaginationControls } from '@/features/crud';
import { ImageUploadDialog } from '@/features/form';
import type { Restaurant } from '@/shared/api';
import { getRestaurantImageUrl } from '@/shared/config';
import { useClampPage, useScreenPagination } from '@/shared/lib/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { ImageIcon } from 'lucide-react';
import { useRemoveRestaurantImage, useUploadRestaurantImage } from '../hooks/mutations';
import { usePagedRestaurants } from '../hooks/queries';
import { RestaurantAddressesDialog } from './restaurant-addresses-dialog';
import { RestaurantIngredientsDialog } from './restaurant-ingredients-dialog';
import { RestaurantManagersDialog } from './restaurant-managers-dialog';
import { UpdateRestaurantDialog } from './update-restaurant-dialog';

export const RestaurantsTable = ({ search }: { search?: string }) => {
  const { page, setPage } = useScreenPagination(search);
  const { data, isLoading } = usePagedRestaurants(search, page);
  const uploadImage = useUploadRestaurantImage();
  const removeImage = useRemoveRestaurantImage();

  useClampPage(page, setPage, data?.totalPages ?? 0);

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
    <>
      <EntityTable
        items={data?.items ?? []}
        columns={columns}
        getRowKey={restaurant => restaurant.id}
        isLoading={isLoading}
        withAvatar
        avatarClassName='rounded-md'
        emptyMessage='Рестораны не найдены'
      />
      <PaginationControls
        page={page}
        totalPages={data?.totalPages ?? 0}
        totalCount={data?.totalCount}
        onPageChange={setPage}
      />
    </>
  );
};
