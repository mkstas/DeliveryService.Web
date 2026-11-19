import type { Order } from '@/shared/api';

export type UpdateOrderStatusData = Pick<Order, 'status'>;
