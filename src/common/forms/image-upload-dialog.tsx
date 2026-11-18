'use client';

import { type ChangeEvent, type FC, type FormEvent, useId, useRef, useState } from 'react';
import { EyeIcon, ImageIcon, LoaderCircleIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import NextImage from 'next/image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from '@/common/components';
import { FormDialog } from './form-dialog';
import { getServerErrorMessage } from './server-errors';

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const maxImageSize = 5 * 1024 * 1024;

type ImageUploadDialogProps = {
  ariaLabel: string;
  name: string;
  imageUrl: string | null;
  getImageUrl: (imageName: string) => string | undefined;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => Promise<void>;
};

export const ImageUploadDialog: FC<ImageUploadDialogProps> = ({
  ariaLabel,
  name,
  imageUrl,
  getImageUrl,
  onUpload,
  onRemove,
}) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const previewUrl = imageUrl ? getImageUrl(imageUrl) : undefined;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;

    setError(undefined);
    setFile(null);

    if (!nextFile) {
      return;
    }

    if (!allowedImageTypes.has(nextFile.type)) {
      event.target.value = '';
      setError('Поддерживаются JPG, PNG, WebP и GIF');
      return;
    }

    if (nextFile.size > maxImageSize) {
      event.target.value = '';
      setError('Размер изображения не должен превышать 5 МБ');
      return;
    }

    setFile(nextFile);
  };

  const handleSubmit = async (event: FormEvent, close: () => void) => {
    event.preventDefault();

    if (!file) {
      setError('Выберите изображение');
      return;
    }

    setIsPending(true);
    setError(undefined);

    try {
      await onUpload(file);
      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = '';
      }

      close();
    } catch (uploadError) {
      setError(
        getServerErrorMessage(
          uploadError,
          { 413: 'Размер изображения не должен превышать 5 МБ' },
          'Не удалось загрузить изображение, попробуйте позже',
        ),
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleRemove = async (close: () => void) => {
    if (!onRemove) {
      return;
    }

    setIsPending(true);
    setError(undefined);

    try {
      await onRemove();
      close();
    } catch (removeError) {
      setError(getServerErrorMessage(removeError, {}, 'Не удалось удалить изображение, попробуйте позже'));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <FormDialog
        trigger={{ icon: ImageIcon, variant: 'ghost', ariaLabel }}
        title='Загрузка изображения'
        description={name}
      >
        {close => (
          <form className='flex flex-col gap-5' onSubmit={event => void handleSubmit(event, close)}>
            <Field data-invalid={Boolean(error)}>
              <FieldLabel htmlFor={id}>Изображение</FieldLabel>
              <div className='flex items-start gap-4'>
                {previewUrl ? (
                  <button
                    type='button'
                    className='relative cursor-zoom-in rounded-lg'
                    aria-label={`Просмотреть изображение ${name}`}
                    title='Просмотреть изображение'
                    onClick={() => setIsPreviewOpen(true)}
                  >
                    <Avatar className='size-20 rounded-lg after:rounded-lg'>
                      <AvatarImage src={previewUrl} alt={name} className='rounded-lg' />
                      <AvatarFallback className='rounded-lg'>
                        <ImageIcon />
                      </AvatarFallback>
                    </Avatar>
                    <span className='absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-md bg-black/60 text-white'>
                      <EyeIcon className='size-3.5' />
                    </span>
                  </button>
                ) : (
                  <Avatar className='size-20 rounded-lg after:rounded-lg'>
                    <AvatarFallback className='rounded-lg'>
                      <ImageIcon />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className='flex min-w-0 flex-1 flex-col gap-2'>
                  <Input
                    ref={inputRef}
                    id={id}
                    type='file'
                    accept='image/jpeg,image/png,image/webp,image/gif'
                    aria-invalid={Boolean(error)}
                    onChange={handleFileChange}
                  />
                  <FieldDescription>JPG, PNG, WebP или GIF, до 5 МБ</FieldDescription>
                </div>
              </div>
              <FieldError errors={error ? [{ message: error }] : []} />
            </Field>
            <div className='flex justify-end gap-2'>
              {imageUrl && onRemove && (
                <Button type='button' variant='outline' disabled={isPending} onClick={() => void handleRemove(close)}>
                  {isPending ? <LoaderCircleIcon className='animate-spin' /> : <Trash2Icon />}
                  Удалить
                </Button>
              )}
              <Button type='submit' disabled={!file || isPending}>
                {isPending ? <LoaderCircleIcon className='animate-spin' /> : <UploadIcon />}
                Загрузить
              </Button>
            </div>
          </form>
        )}
      </FormDialog>
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className='flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-6xl flex-col overflow-hidden sm:w-full sm:max-w-6xl'>
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <div className='flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-auto rounded-lg bg-muted/30 p-2'>
              <NextImage
                src={previewUrl}
                alt={name}
                width={1200}
                height={800}
                unoptimized
                className='h-auto max-h-[75vh] w-auto max-w-full rounded-lg object-contain'
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
