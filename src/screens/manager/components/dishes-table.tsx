'use client';

import { type EntityColumn, EntityTable, PaginationControls } from '@/features/crud';
import { ImageUploadDialog } from '@/features/form';
import { UpdateDishDialog } from '@/screens/dishes';
import type { Dish } from '@/shared/api';
import { getDishImageUrl } from '@/shared/config';
import { useClampPage, useScreenPagination } from '@/shared/lib/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';
import { ImageIcon } from 'lucide-react';
import { useRemoveMyDishImage, useUploadMyDishImage } from '../hooks/mutations';
import { usePagedMyDishes } from '../hooks/queries';
import { DishIngredientsDialog } from './dish-ingredients-dialog';
import { DishSpecificationsDialog } from './dish-specifications-dialog';

type DishesTableProps = {
  search?: string;
};

export const DishesTable = ({ search }: DishesTableProps) => {
  const { page, setPage } = useScreenPagination(search);
  const { data, isLoading } = usePagedMyDishes(search, page);
  const uploadImage = useUploadMyDishImage();
  const removeImage = useRemoveMyDishImage();

  useClampPage(page, setPage, data?.totalPages ?? 0);

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
      header: 'Цена',
      className: 'w-32',
      cell: dish => `${dish.price.toLocaleString('ru-RU')} руб.`,
    },
    {
      header: 'Описание',
      cell: dish => <span className='text-muted-foreground'>{dish.description ?? '—'}</span>,
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
            onUpload={file => uploadImage.mutateAsync({ dishId: dish.id, file })}
            onRemove={() => removeImage.mutateAsync(dish.id)}
          />
          <UpdateDishDialog dish={dish} />
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
