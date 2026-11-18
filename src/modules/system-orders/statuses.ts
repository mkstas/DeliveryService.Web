import type { SelectOption } from '@/common/forms';

export const orderStatusOptions: SelectOption[] = [
  { value: 'Created', label: 'Создан' },
  { value: 'Cooking', label: 'Готовится' },
  { value: 'Delivering', label: 'В пути' },
  { value: 'Completed', label: 'Завершён' },
  { value: 'Cancelled', label: 'Отменён' },
];

export const orderStatusLabels: Record<string, string> = Object.fromEntries(
  orderStatusOptions.map(option => [option.value, option.label]),
);
