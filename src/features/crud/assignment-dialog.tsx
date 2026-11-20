'use client';

import { FormDialog } from '@/features/form';
import { CheckboxList } from '@/shared/ui';
import { type ReactNode } from 'react';
import { ChevronDownIcon } from 'lucide-react';

type AssignmentDialogProps<T> = {
  items: T[];
  selectedIds: Set<string>;
  getId: (item: T) => string;
  getLabel: (item: T) => string;
  idPrefix: string;
  triggerText: string;
  title: string;
  description?: ReactNode;
  cols?: number;
  contentClassName?: string;
  isPending?: boolean;
  isError?: boolean;
  errorMessage: string;
  onToggle: (item: T, checked: boolean) => void;
};

export function AssignmentDialog<T>({
  items,
  selectedIds,
  getId,
  getLabel,
  idPrefix,
  triggerText,
  title,
  description,
  cols = 2,
  contentClassName = 'sm:max-w-2xl w-full',
  isPending,
  isError,
  errorMessage,
  onToggle,
}: AssignmentDialogProps<T>) {
  return (
    <FormDialog
      trigger={{ text: triggerText, trailingIcon: ChevronDownIcon, variant: 'secondary' }}
      title={title}
      description={description}
      contentClassName={contentClassName}
    >
      <>
        <CheckboxList
          items={items}
          idPrefix={idPrefix}
          getId={getId}
          getLabel={getLabel}
          selectedIds={selectedIds}
          disabled={isPending}
          onToggle={onToggle}
          className={`grid gap-2 sm:grid-cols-${cols}`}
        />
        {isError && <p className='text-sm text-destructive'>{errorMessage}</p>}
      </>
    </FormDialog>
  );
}
