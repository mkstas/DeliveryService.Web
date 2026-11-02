import { useState } from 'react';
import { ApiError } from '@/common/api';
import { Role, UserListItem } from '../types';
import { useToggleUserRole } from './useToggleUserRole';

const getRoleErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.status === 403) {
      return 'Недостаточно прав для изменения ролей';
    }

    if (error.serverMessage) {
      return error.serverMessage;
    }
  }

  return 'Не удалось изменить роль, попробуйте снова';
};

export const useUserRoles = (user: UserListItem) => {
  const toggleRole = useToggleUserRole();
  const [selected, setSelected] = useState<string[]>(() => user.roles.map(role => role.id));
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggle = async (role: Role, assign: boolean) => {
    setError(null);
    setSelected(prev => (assign ? [...prev, role.id] : prev.filter(id => id !== role.id)));
    setPendingIds(prev => [...prev, role.id]);

    try {
      await toggleRole.mutateAsync({ userId: user.id, roleId: role.id, assign });
    } catch (error) {
      setSelected(prev => (assign ? prev.filter(id => id !== role.id) : [...prev, role.id]));
      setError(getRoleErrorMessage(error));
    } finally {
      setPendingIds(prev => prev.filter(id => id !== role.id));
    }
  };

  return { selected, pendingIds, error, toggle };
};
