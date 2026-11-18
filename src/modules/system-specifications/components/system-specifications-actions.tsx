'use client';

import { ActionsBar, CreateNamedEntityDialog } from '@/common/crud';
import { useCreateSpecification } from '../hooks/mutations';
import { useSpecifications } from '../hooks/queries';
import { specificationTexts } from '../texts';

export const SystemSpecificationsActions = () => {
  const { isLoading } = useSpecifications();
  const createSpecification = useCreateSpecification();

  return (
    <ActionsBar isLoading={isLoading}>
      <CreateNamedEntityDialog texts={specificationTexts} onSave={name => createSpecification.mutateAsync({ name })} />
    </ActionsBar>
  );
};
