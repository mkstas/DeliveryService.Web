import { useState } from 'react';
import { ApiError } from '@/common/api';
import { Permission, Role } from '../types';
import { useToggleRolePermission } from './useToggleRolePermission';

const getPermissionErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.status === 403) {
      return 'Недостаточно прав для изменения разрешений';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Не удалось изменить разрешение, попробуйте снова';
};

export const useRolePermissions = (role: Role) => {
  const togglePermission = useToggleRolePermission();
  const [selected, setSelected] = useState<string[]>(() => role.permissions.map(permission => permission.id));
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggle = async (permission: Permission, assign: boolean) => {
    setError(null);
    setSelected(prev => (assign ? [...prev, permission.id] : prev.filter(id => id !== permission.id)));
    setPendingIds(prev => [...prev, permission.id]);

    try {
      await togglePermission.mutateAsync({ roleId: role.id, permissionId: permission.id, assign });
    } catch (error) {
      setSelected(prev => (assign ? prev.filter(id => id !== permission.id) : [...prev, permission.id]));
      setError(getPermissionErrorMessage(error));
    } finally {
      setPendingIds(prev => prev.filter(id => id !== permission.id));
    }
  };

  return { selected, pendingIds, error, toggle };
};
