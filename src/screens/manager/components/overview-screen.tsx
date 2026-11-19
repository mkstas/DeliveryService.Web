'use client';

import { ScreenHeader } from '@/screens/dashboard';
import { type FC } from 'react';
import { StoreIcon } from 'lucide-react';
import { useMyDishes, useMyRestaurant } from '../hooks/queries';
import { NoRestaurantCard, RestaurantInfoCard, RestaurantInfoCardSkeleton } from './restaurant-info-card';

export const OverviewScreen: FC = () => {
  const { data: restaurant, isLoading: isRestaurantLoading } = useMyRestaurant();
  const { data: dishes, isLoading: isDishesLoading } = useMyDishes();

  if (isRestaurantLoading) {
    return (
      <>
        <ScreenHeader title='Мой ресторан' icon={StoreIcon} />
        <RestaurantInfoCardSkeleton />
      </>
    );
  }

  if (!restaurant) {
    return (
      <>
        <ScreenHeader title='Мой ресторан' icon={StoreIcon} />
        <NoRestaurantCard />
      </>
    );
  }

  return (
    <>
      <ScreenHeader title='Мой ресторан' icon={StoreIcon} />
      <RestaurantInfoCard restaurant={restaurant} dishCount={isDishesLoading ? 0 : (dishes?.length ?? 0)} />
    </>
  );
};
