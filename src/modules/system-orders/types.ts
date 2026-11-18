import type { Order } from '@/common/api';

export type UpdateOrderStatusData = Pick<Order, 'status'>;
