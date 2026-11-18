'use client';

import { PencilIcon, PlusIcon } from 'lucide-react';
import { FormDialog } from '@/common/forms';
import { type NamedEntity, NamedEntityForm, type NamedEntityTexts } from './named-entity-form';

type CreateNamedEntityDialogProps = {
  texts: NamedEntityTexts;
  onSave: (name: string) => Promise<void>;
};

export const CreateNamedEntityDialog = ({ texts, onSave }: CreateNamedEntityDialogProps) => {
  return (
    <FormDialog
      trigger={{ icon: PlusIcon, text: texts.createTriggerText }}
      title={texts.createTitle}
      description={texts.createDescription}
    >
      {close => <NamedEntityForm texts={texts} onSave={onSave} onSuccess={close} />}
    </FormDialog>
  );
};

type UpdateNamedEntityDialogProps<T extends NamedEntity> = {
  entity: T;
  texts: NamedEntityTexts;
  onSave: (name: string) => Promise<void>;
};

export const UpdateNamedEntityDialog = <T extends NamedEntity>({
  entity,
  texts,
  onSave,
}: UpdateNamedEntityDialogProps<T>) => {
  return (
    <FormDialog
      trigger={{ icon: PencilIcon, variant: 'ghost', ariaLabel: texts.editAriaLabel }}
      title={texts.updateTitle}
      description={texts.updateDescription}
    >
      {close => <NamedEntityForm entity={entity} texts={texts} onSave={onSave} onSuccess={close} />}
    </FormDialog>
  );
};
