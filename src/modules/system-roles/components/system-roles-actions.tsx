'use client';

import { ActionsBar, CreateNamedEntityDialog } from '@/common/crud';
import { useCreateRole } from '../hooks/mutations';
import { usePermissions, useRoles } from '../hooks/queries';
import { roleTexts } from '../texts';

export const SystemRolesActions = () => {
  const { isLoading: isLoadingRoles } = useRoles();
  const { isLoading: isLoadingPermissions } = usePermissions();
  const createRole = useCreateRole();

  return (
    <ActionsBar isLoading={isLoadingRoles || isLoadingPermissions}>
      <CreateNamedEntityDialog texts={roleTexts} onSave={name => createRole.mutateAsync({ name })} />
    </ActionsBar>
  );
};
