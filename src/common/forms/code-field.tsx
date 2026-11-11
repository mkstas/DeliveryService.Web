'use client';

import { type ReactNode } from 'react';
import { KeyRoundIcon } from 'lucide-react';
import { TextField } from './text-field';
import type { AnyReactFormApi } from './types';

type CodeFieldProps = {
  form: AnyReactFormApi;
  name: string;
  label?: string;
  actions?: ReactNode;
};

export const CodeField = ({ form, name, label, actions }: CodeFieldProps) => {
  return (
    <TextField
      form={form}
      name={name}
      label={label}
      icon={KeyRoundIcon}
      type='text'
      inputMode='numeric'
      autoComplete='one-time-code'
      maxLength={6}
      placeholder='000000'
      actions={actions}
    />
  );
};
