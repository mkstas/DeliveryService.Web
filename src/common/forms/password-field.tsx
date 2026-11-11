'use client';

import { type ReactNode, useState } from 'react';
import { EyeIcon, EyeOffIcon, KeyRoundIcon, type LucideIcon } from 'lucide-react';
import { InputGroupAddon, InputGroupButton } from '@/common/components';
import { TextField } from './text-field';
import type { AnyReactFormApi } from './types';

type PasswordFieldProps = {
  form: AnyReactFormApi;
  name: string;
  label?: string;
  icon?: LucideIcon;
  placeholder?: string;
  autoComplete?: string;
  actions?: ReactNode;
};

export const PasswordField = ({
  form,
  name,
  label,
  icon = KeyRoundIcon,
  placeholder,
  autoComplete,
  actions,
}: PasswordFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      form={form}
      name={name}
      label={label}
      icon={icon}
      type={isVisible ? 'text' : 'password'}
      placeholder={placeholder}
      autoComplete={autoComplete}
      actions={actions}
      trailing={
        <InputGroupAddon align='inline-end'>
          <InputGroupButton
            size='icon-sm'
            aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
            title={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
            onClick={() => setIsVisible(prev => !prev)}
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      }
    />
  );
};
