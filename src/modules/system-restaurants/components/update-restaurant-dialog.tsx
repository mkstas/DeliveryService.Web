'use client';

import { PencilIcon } from 'lucide-react';
import type { Restaurant } from '@/common/api';
import { FormDialog } from '@/common/forms';
import { restaurantTexts } from '../texts';
import { RestaurantForm } from './restaurant-form';

type UpdateRestaurantDialogProps = {
  restaurant: Restaurant;
};

export const UpdateRestaurantDialog = ({ restaurant }: UpdateRestaurantDialogProps) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: restaurantTexts.editAriaLabel }}
      title={restaurantTexts.updateTitle}
      description={restaurantTexts.updateDescription}
    >
      {close => <RestaurantForm restaurant={restaurant} onSuccess={close} />}
    </FormDialog>
  );
};
