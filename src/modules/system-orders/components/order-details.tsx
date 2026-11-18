'use client';

import type { OrderDish } from '@/common/api';
import { Badge } from '@/common/components';
import { useDishes } from '@/modules/system-dishes';

type OrderDetailsProps = {
  details: OrderDish[] | null;
};

export const OrderDetails = ({ details }: OrderDetailsProps) => {
  const { data: dishes } = useDishes();

  if (!details?.length) {
    return <span className='text-muted-foreground'>—</span>;
  }

  return (
    <div className='flex flex-wrap gap-1'>
      {details.map(detail => {
        const dish = dishes?.find(dish => dish.id === detail.dishId);

        return (
          <Badge key={detail.dishId} variant='outline'>
            {dish?.name ?? detail.dishId.slice(0, 8)} ×{detail.quantity}
          </Badge>
        );
      })}
    </div>
  );
};
