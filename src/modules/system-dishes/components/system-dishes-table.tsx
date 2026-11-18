'use client';

import { ImageIcon } from 'lucide-react';
import type { Dish } from '@/common/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/common/components';
import { getDishImageUrl } from '@/common/config';
import { type EntityColumn, EntityTable, RemoveDialog } from '@/common/crud';
import { ImageUploadDialog } from '@/common/forms';
import { useCategories } from '@/modules/system-categories';
import { useRestaurants } from '@/modules/system-restaurants';
import { useDeleteDish, useRemoveDishImage, useUploadDishImage } from '../hooks/mutations';
import { useDishes } from '../hooks/queries';
import { DishSpecificationsDialog } from './dish-specifications-dialog';
import { UpdateDishDialog } from './update-dish-dialog';

export const SystemDishesTable = () => {
  const { data: dishes, isLoading } = useDishes();
  const { data: restaurants } = useRestaurants();
  const { data: categories } = useCategories();
  const deleteDish = useDeleteDish();
  const uploadImage = useUploadDishImage();
  const removeImage = useRemoveDishImage();

  const getRestaurantName = (restaurantId: string) =>
    restaurants?.find(restaurant => restaurant.id === restaurantId)?.name ?? '—';

  const getCategoryName = (categoryId: string) => categories?.find(category => category.id === categoryId)?.name ?? '—';

  const columns: EntityColumn<Dish>[] = [
    {
      header: 'Название',
      className: 'w-48',
      cell: dish => (
        <div className='flex items-center gap-3'>
          <Avatar className='size-8 rounded-md after:rounded-md'>
            {dish.imageUrl && (
              <AvatarImage src={getDishImageUrl(dish.imageUrl)} alt={dish.name} className='rounded-md' />
            )}
            <AvatarFallback className='rounded-md'>
              <ImageIcon className='size-4' />
            </AvatarFallback>
          </Avatar>
          <span>{dish.name}</span>
        </div>
      ),
    },
    {
      header: 'Ресторан',
      className: 'w-48',
      cell: dish => getRestaurantName(dish.restaurantId),
    },
    {
      header: 'Категория',
      className: 'w-48',
      cell: dish => getCategoryName(dish.categoryId),
    },
    {
      header: 'Цена',
      className: 'w-48',
      cell: dish => `${dish.price.toLocaleString('ru-RU')} руб.`,
    },
    {
      header: 'Действия',
      className: 'text-right',
      cellClassName: 'flex items-center justify-end gap-2',
      cell: dish => (
        <>
          <DishSpecificationsDialog dish={dish} />
          <ImageUploadDialog
            ariaLabel={`Загрузить изображение блюда «${dish.name}»`}
            name={dish.name}
            imageUrl={dish.imageUrl}
            getImageUrl={getDishImageUrl}
            onUpload={file => uploadImage.mutateAsync({ id: dish.id, file })}
            onRemove={() => removeImage.mutateAsync(dish.id)}
          />
          <UpdateDishDialog dish={dish} />
          <RemoveDialog
            title='Удаление блюда'
            description={`Блюдо «${dish.name}» будет удалено`}
            ariaLabel='Удалить блюдо'
            onConfirm={() => deleteDish.mutateAsync(dish.id)}
          />
        </>
      ),
    },
  ];

  return (
    <EntityTable
      items={dishes ?? []}
      columns={columns}
      getRowKey={dish => dish.id}
      isLoading={isLoading}
      withAvatar
      avatarClassName='rounded-md'
      emptyMessage='Блюда не найдены'
    />
  );
};
