import { useMutation } from '@tanstack/react-query';
import { resend } from '../api';

export const useResend = () => {
  return useMutation({
    mutationFn: resend,
  });
};
