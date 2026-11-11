'use client';

import { type FC, type ReactNode, useState } from 'react';
import { type LucideIcon } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components';

type FormDialogTriggerProps = {
  icon?: LucideIcon;
  text?: string;
  trailingIcon?: LucideIcon;
  variant?: React.ComponentProps<typeof Button>['variant'];
  ariaLabel?: string;
};

type FormDialogProps = {
  trigger: FormDialogTriggerProps;
  title: string;
  description?: ReactNode;
  contentClassName?: string;
  children: ReactNode | ((close: () => void) => ReactNode);
};

export const FormDialog: FC<FormDialogProps> = ({
  trigger,
  title,
  description,
  contentClassName = 'sm:max-w-md',
  children,
}) => {
  const [open, setOpen] = useState(false);
  const { icon: Icon, text, trailingIcon: TrailingIcon, variant = 'default', ariaLabel } = trigger;
  const isIconOnly = !text;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant={variant} {...(isIconOnly ? { 'aria-label': ariaLabel, title: ariaLabel } : {})} />}
      >
        {Icon && <Icon />}
        {text}
        {TrailingIcon && <TrailingIcon className='text-muted-foreground' />}
      </DialogTrigger>
      <DialogContent className={contentClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description !== undefined && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {typeof children === 'function' ? children(() => setOpen(false)) : children}
      </DialogContent>
    </Dialog>
  );
};
