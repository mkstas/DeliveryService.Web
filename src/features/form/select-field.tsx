'use client';

import {
  Field,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useId } from 'react';
import { type LucideIcon } from 'lucide-react';
import { clearServerErrors } from './server-errors';
import type { AnyReactFormApi } from './types';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  form: AnyReactFormApi;
  name: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: LucideIcon;
  disabled?: boolean;
};

export const SelectField = ({ form, name, label, options, placeholder, icon: Icon, disabled }: SelectFieldProps) => {
  const id = useId();

  return (
    <form.Field
      name={name}
      listeners={{
        onChange: () => clearServerErrors(form, [name]),
      }}
    >
      {field => {
        const isError = field.state.meta.errors.length > 0 && (field.state.meta.isTouched || form.state.isSubmitted);

        return (
          <Field>
            {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
            <Select
              value={field.state.value ?? ''}
              onValueChange={value => field.handleChange(value ?? '')}
              disabled={disabled}
            >
              <SelectTrigger id={id} className='w-full' aria-label={label ?? placeholder} aria-invalid={isError}>
                {Icon && <Icon className='size-4 text-muted-foreground' />}
                <SelectValue placeholder={placeholder}>
                  {value => options.find(option => option.value === value)?.label ?? placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isError && (
              <FieldError errors={field.state.meta.errors.slice(0, 1) as Array<{ message?: string } | undefined>} />
            )}
          </Field>
        );
      }}
    </form.Field>
  );
};
