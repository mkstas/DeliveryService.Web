'use client';

import { FC } from 'react';
import { cn } from 'cn';
import { LoaderCircleIcon } from 'lucide-react';
import { Switch } from '@/common/components';
import { Permission } from '../types';

type PermissionOptionProps = {
  permission: Permission;
  checked: boolean;
  isPending: boolean;
  onToggle: (assign: boolean) => void;
};

export const PermissionOption: FC<PermissionOptionProps> = ({ permission, checked, isPending, onToggle }) => {
  const toggle = () => {
    if (!isPending) {
      onToggle(!checked);
    }
  };

  return (
    <div
      onClick={toggle}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors select-none',
        'hover:bg-muted/50',
        checked && 'border-primary/40 bg-primary/5 hover:bg-primary/10',
        isPending && 'pointer-events-none opacity-70',
      )}
    >
      <Switch
        checked={checked}
        disabled={isPending}
        onClick={event => event.stopPropagation()}
        onCheckedChange={onToggle}
      />
      <span className='flex-1'>{permission.displayName}</span>
      {isPending && <LoaderCircleIcon className='size-4 animate-spin text-muted-foreground' />}
    </div>
  );
};
