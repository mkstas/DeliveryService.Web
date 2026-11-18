'use client';

import { type FC, useState } from 'react';
import { LoaderCircleIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/common/components';
import { FormDialog } from '@/common/forms';

type RemoveDialogProps = {
  title: string;
  description: string;
  ariaLabel?: string;
  isPending?: boolean;
  onConfirm: () => Promise<void> | void;
};

export const RemoveDialog: FC<RemoveDialogProps> = ({ title, description, ariaLabel, isPending, onConfirm }) => {
  const [isError, setIsError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const pending = isPending || isDeleting;

  return (
    <FormDialog
      trigger={{ icon: TrashIcon, variant: 'destructive', ariaLabel: ariaLabel ?? title }}
      title={title}
      description={description}
    >
      {close => (
        <div className='flex flex-col gap-4'>
          {isError && <p className='text-sm text-destructive'>Не удалось удалить, попробуйте снова</p>}
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='secondary' onClick={close}>
              Отмена
            </Button>
            <Button
              type='button'
              variant='destructive'
              disabled={pending}
              onClick={async () => {
                setIsError(false);

                try {
                  setIsDeleting(true);
                  await onConfirm();
                  close();
                } catch {
                  setIsError(true);
                } finally {
                  setIsDeleting(false);
                }
              }}
            >
              {pending && <LoaderCircleIcon className='animate-spin' />}
              Удалить
            </Button>
          </div>
        </div>
      )}
    </FormDialog>
  );
};
