'use client';

import { ImageUploadDialog } from '@/features/form';
import type { Restaurant } from '@/shared/api';
import { getRestaurantImageUrl, ROUTES } from '@/shared/config';
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardHeader, CardTitle, Skeleton } from '@/shared/ui';
import { type FC } from 'react';
import { ImageIcon, LeafyGreenIcon, SoupIcon, StoreIcon } from 'lucide-react';
import Link from 'next/link';
import { useRemoveMyRestaurantImage, useUploadMyRestaurantImage } from '../hooks/mutations';
import { EditRestaurantDialog } from './edit-restaurant-dialog';
import { RestaurantAddressesDialog } from './restaurant-addresses-dialog';

type StatProps = {
  icon: typeof SoupIcon;
  label: string;
  value: number;
  href?: string;
};

const StatContent: FC<Omit<StatProps, 'href'>> = ({ icon: Icon, label, value }) => (
  <>
    <div className='flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary'>
      <Icon className='size-4' />
    </div>
    <div className='flex flex-col'>
      <span className='text-lg leading-tight font-semibold'>{value}</span>
      <span className='text-xs text-muted-foreground'>{label}</span>
    </div>
  </>
);

const Stat: FC<StatProps> = ({ icon, label, value, href }) => {
  const className = 'flex items-center gap-3 rounded-lg border p-3';

  if (href) {
    return (
      <Link
        href={href}
        className={`${className} transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none`}
      >
        <StatContent icon={icon} label={label} value={value} />
      </Link>
    );
  }

  return (
    <div className={className}>
      <StatContent icon={icon} label={label} value={value} />
    </div>
  );
};

export const RestaurantInfoCard: FC<{ restaurant: Restaurant; dishCount: number }> = ({ restaurant, dishCount }) => {
  const uploadImage = useUploadMyRestaurantImage();
  const removeImage = useRemoveMyRestaurantImage();

  return (
    <Card>
      <CardHeader>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-12 rounded-lg after:rounded-lg'>
              {restaurant.imageUrl && (
                <AvatarImage
                  src={getRestaurantImageUrl(restaurant.imageUrl)}
                  alt={restaurant.name}
                  className='rounded-lg'
                />
              )}
              <AvatarFallback className='rounded-lg'>
                <ImageIcon className='size-5' />
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-1'>
              <CardTitle className='text-lg'>{restaurant.name}</CardTitle>
              {restaurant.addresses.length > 0 && (
                <span className='text-sm text-muted-foreground'>
                  {restaurant.addresses.map(address => address.address).join(', ')}
                </span>
              )}
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <ImageUploadDialog
              ariaLabel={`Загрузить изображение заведения «${restaurant.name}»`}
              name={restaurant.name}
              imageUrl={restaurant.imageUrl}
              getImageUrl={getRestaurantImageUrl}
              onUpload={file => uploadImage.mutateAsync(file)}
              onRemove={() => removeImage.mutateAsync()}
            />
            <RestaurantAddressesDialog addresses={restaurant.addresses} />
            <EditRestaurantDialog restaurant={restaurant} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid gap-3 sm:grid-cols-2'>
          <Stat icon={SoupIcon} label='Блюда' value={dishCount} href={ROUTES.DASHBOARD_DISHES} />
          <Stat
            icon={LeafyGreenIcon}
            label='Ингредиенты'
            value={restaurant.ingredients.length}
            href={ROUTES.DASHBOARD_INGREDIENTS}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export const RestaurantInfoCardSkeleton: FC = () => (
  <Card>
    <CardHeader>
      <div className='flex items-center gap-3'>
        <Skeleton className='size-12 rounded-lg' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-4 w-56' />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className='grid gap-3 sm:grid-cols-2'>
        <Skeleton className='h-16 w-full rounded-lg' />
        <Skeleton className='h-16 w-full rounded-lg' />
      </div>
    </CardContent>
  </Card>
);

export const NoRestaurantCard: FC = () => (
  <Card>
    <CardContent>
      <div className='flex flex-col items-center gap-2 py-8 text-center'>
        <div className='flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground'>
          <StoreIcon className='size-6' />
        </div>
        <p className='font-medium'>Заведение не назначено</p>
        <p className='text-sm text-muted-foreground'>
          Обратитесь к администратору, чтобы вас назначили менеджером заведения.
        </p>
      </div>
    </CardContent>
  </Card>
);
