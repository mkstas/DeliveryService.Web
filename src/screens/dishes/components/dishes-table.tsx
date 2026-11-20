'use client';

import { type EntityColumn, EntityTable, PaginationControls, RemoveDialog } from '@/features/crud';
import { ImageUploadDialog } from '@/features/form';
import { useCategories } from '@/screens/categories';
import { useRestaurants } from '@/screens/restaurants';
import type { Dish } from '@/shared/api';
import { getDishImageUrl } from '@/shared/config';
import { useClampPage, useScreenPagination } from '@/shared/lib/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { ImageIcon } from 'lucide-react';
import { useDeleteDish, useRemoveDishImage, useUploadDishImage } from '../hooks/mutations';
import { usePagedDishes } from '../hooks/queries';
import { DishIngredientsDialog } from './dish-ingredients-dialog';
import { DishSpecificationsDialog } from './dish-specifications-dialog';
import { UpdateDishDialog } from './update-dish-dialog';

export const DishesTable = ({ search }: { search?: string }) => {
  const { page, setPage } = useScreenPagination(search);
  const { data, isLoading } = usePagedDishes(search, page);
  const { data: restaurants } = useRestaurants();
  const { data: categories } = useCategories();
  const deleteDish = useDeleteDish();
  const uploadImage = useUploadDishImage();
  const removeImage = useRemoveDishImage();

  useClampPage(page, setPage, data?.totalPages ?? 0);

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
          <DishIngredientsDialog dish={dish} />
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
    <>
      <EntityTable
        items={data?.items ?? []}
        columns={columns}
        getRowKey={dish => dish.id}
        isLoading={isLoading}
        withAvatar
        avatarClassName='rounded-md'
        emptyMessage='Блюда не найдены'
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
