'use client';

import { type ReactNode } from 'react';
import { LoaderCircleIcon } from 'lucide-react';
import { Button } from '@/common/components';
import type { AnyReactFormApi } from './types';

type SubmitButtonProps = {
  form: AnyReactFormApi;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: boolean | ((values: any) => boolean);
  withSpinner?: boolean;
  className?: string;
  variant?: React.ComponentProps<typeof Button>['variant'];
  size?: React.ComponentProps<typeof Button>['size'];
  children: ReactNode;
};

export const SubmitButton = ({
  form,
  disabled,
  withSpinner = false,
  className,
  variant,
  size,
  children,
}: SubmitButtonProps) => {
  return (
    <form.Subscribe
      selector={state => ({
        isSubmitting: state.isSubmitting,
        values: state.values,
      })}
    >
      {({ isSubmitting, values }) => (
        <Button
          type='submit'
          className={className}
          variant={variant}
          size={size}
          disabled={isSubmitting || (typeof disabled === 'function' ? disabled(values) : disabled)}
        >
          {isSubmitting && withSpinner && <LoaderCircleIcon className='animate-spin' />}
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
};
