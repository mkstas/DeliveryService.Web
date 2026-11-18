'use client';

import { useId } from 'react';
import { Field, FieldError, FieldLabel, Textarea } from '@/common/components';
import { clearServerErrors } from './server-errors';
import type { AnyReactFormApi } from './types';

type TextareaFieldProps = {
  form: AnyReactFormApi;
  name: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
};

export const TextareaField = ({ form, name, label, placeholder, maxLength }: TextareaFieldProps) => {
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
            <Textarea
              id={id}
              placeholder={placeholder}
              maxLength={maxLength}
              aria-invalid={isError}
              value={field.state.value}
              onChange={event => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
            />
            {isError && (
              <FieldError errors={field.state.meta.errors.slice(0, 1) as Array<{ message?: string } | undefined>} />
            )}
          </Field>
        );
      }}
    </form.Field>
  );
};
