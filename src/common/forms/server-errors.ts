import type { AnyFormApi } from '@tanstack/react-form';
import { HttpError } from '@/common/api/client';

export const getServerErrorMessage = (
  error: unknown,
  statusMessages: Partial<Record<number, string>>,
  fallback: string,
): string => {
  if (error instanceof HttpError) {
    return statusMessages[error.status] ?? error.serverMessage ?? fallback;
  }

  return fallback;
};

export const clearServerErrors = (form: AnyFormApi, fields: string[]): void => {
  for (const field of fields) {
    form.setFieldMeta(field, prev => ({
      ...prev,
      errorMap: { ...prev.errorMap, onServer: undefined },
    }));
  }
};

export const setServerError = (form: AnyFormApi, field: string, message: string): void => {
  form.setFieldMeta(field, prev => ({
    ...prev,
    errorMap: { ...prev.errorMap, onServer: [{ message }] },
  }));
};
