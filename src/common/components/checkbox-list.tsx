'use client';

import { Checkbox } from '@/common/components/checkbox';

type CheckboxListProps<T> = {
  items: T[];
  idPrefix: string;
  getId: (item: T) => string;
  getLabel: (item: T) => string;
  selectedIds: Set<string>;
  disabled?: boolean;
  onToggle: (item: T, checked: boolean) => void;
  className?: string;
};

export function CheckboxList<T>({
  items,
  idPrefix,
  getId,
  getLabel,
  selectedIds,
  disabled,
  onToggle,
  className = 'grid gap-2',
}: CheckboxListProps<T>) {
  return (
    <div className={className}>
      {items.map(item => {
        const id = `${idPrefix}-${getId(item)}`;

        return (
          <div key={id} className='flex items-start gap-2'>
            <Checkbox
              id={id}
              className='mt-0.5'
              checked={selectedIds.has(getId(item))}
              disabled={disabled}
              onCheckedChange={checked => onToggle(item, checked)}
            />
            <label htmlFor={id} className='cursor-pointer leading-snug'>
              {getLabel(item)}
            </label>
          </div>
        );
      })}
    </div>
  );
}
