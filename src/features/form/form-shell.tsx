'use client';

import { type ReactNode } from 'react';
import { type AnyFormApi } from '@tanstack/react-form';

type FormShellProps = {
  form: AnyFormApi;
  className?: string;
  children: ReactNode;
};

export const FormShell = ({ form, className, children }: FormShellProps) => {
  return (
    <form
      className={className}
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {children}
    </form>
  );
};
