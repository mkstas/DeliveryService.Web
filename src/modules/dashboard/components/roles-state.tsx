import { FC } from 'react';
import { cn } from 'cn';
import { type LucideIcon } from 'lucide-react';
import { Button } from '@/common/components';

type RolesStateAction = {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: 'default' | 'outline';
};

type RolesStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: 'muted' | 'destructive';
  action?: RolesStateAction;
};

export const RolesState: FC<RolesStateProps> = ({ icon: Icon, title, description, tone = 'muted', action }) => {
  const ActionIcon = action?.icon;

  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed px-6 py-16 text-center'>
      <div
        className={cn(
          'flex size-12 items-center justify-center rounded-2xl',
          tone === 'destructive' ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground',
        )}
      >
        <Icon className='size-6' />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='font-medium'>{title}</p>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      {action && (
        <Button variant={action.variant} onClick={action.onClick}>
          {ActionIcon && <ActionIcon />}
          {action.label}
        </Button>
      )}
    </div>
  );
};
