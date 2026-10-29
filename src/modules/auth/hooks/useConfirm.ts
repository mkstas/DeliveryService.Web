import { useMutation } from '@tanstack/react-query';
import { confirm } from '../api';

export const useConfirm = () => {
  return useMutation({
    mutationFn: confirm,
  });
};
