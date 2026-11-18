'use client';

import { PlusIcon } from 'lucide-react';
import { ActionsBar } from '@/common/crud';
import { FormDialog } from '@/common/forms';
import { useRestaurants } from '../hooks/queries';
import { restaurantTexts } from '../texts';
import { RestaurantForm } from './restaurant-form';

export const SystemRestaurantsActions = () => {
  const { isLoading } = useRestaurants();

  return (
    <ActionsBar isLoading={isLoading}>
      <FormDialog
        trigger={{ icon: PlusIcon, text: restaurantTexts.createTriggerText }}
        title={restaurantTexts.createTitle}
        description={restaurantTexts.createDescription}
      >
        {close => <RestaurantForm onSuccess={close} />}
      </FormDialog>
    </ActionsBar>
  );
};
