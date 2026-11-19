'use client';

import { FormDialog } from '@/features/form';
import { SearchInput } from '@/shared/ui';
import { PlusIcon } from 'lucide-react';
import { restaurantTexts } from '../texts';
import { RestaurantForm } from './restaurant-form';

type RestaurantsActionsProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export const RestaurantsActions = ({ search, onSearchChange }: RestaurantsActionsProps) => {
  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
      <SearchInput
        value={search}
        onChange={event => onSearchChange(event.target.value)}
        placeholder='Поиск по названию'
        aria-label='Поиск ресторана по названию'
      />
      <FormDialog
        trigger={{
          icon: PlusIcon,
          text: restaurantTexts.createTriggerText,
          className: 'max-sm:w-full',
        }}
        title={restaurantTexts.createTitle}
        description={restaurantTexts.createDescription}
      >
        {close => <RestaurantForm onSuccess={close} />}
      </FormDialog>
    </div>
  );
};
