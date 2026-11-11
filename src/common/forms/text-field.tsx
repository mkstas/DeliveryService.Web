'use client';

import { type ReactNode, useId } from 'react';
import { type LucideIcon } from 'lucide-react';
import { Field, FieldError, FieldLabel, InputGroup, InputGroupAddon, InputGroupInput } from '@/common/components';
import { clearServerErrors } from './server-errors';
import type { AnyReactFormApi } from './types';

type TextFieldProps = {
  form: AnyReactFormApi;
  name: string;
  label?: string;
  icon?: LucideIcon;
  type?: React.ComponentProps<'input'>['type'];
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.ComponentProps<'input'>['inputMode'];
  maxLength?: number;
  trailing?: ReactNode;
  actions?: ReactNode;
};

export const TextField = ({
  form,
  name,
  label,
  icon: Icon,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  trailing,
  actions,
}: TextFieldProps) => {
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

        const input = (
          <InputGroup>
            {Icon && (
              <InputGroupAddon>
                <Icon />
              </InputGroupAddon>
            )}
            <InputGroupInput
              id={id}
              type={type}
              autoComplete={autoComplete}
              inputMode={inputMode}
              maxLength={maxLength}
              aria-invalid={isError}
              placeholder={placeholder}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {trailing}
          </InputGroup>
        );

        const error = isError ? (
          <FieldError errors={field.state.meta.errors.slice(0, 1) as Array<{ message?: string } | undefined>} />
        ) : null;

        return (
          <Field>
            {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
            {actions ? (
              <div className='flex flex-col gap-2 sm:flex-row sm:items-start'>
                <div className='flex min-w-0 flex-1 flex-col gap-2'>
                  {input}
                  {error}
                </div>
                <div className='flex shrink-0 gap-2'>{actions}</div>
              </div>
            ) : (
              <>
                {input}
                {error}
              </>
            )}
          </Field>
        );
      }}
    </form.Field>
  );
};
