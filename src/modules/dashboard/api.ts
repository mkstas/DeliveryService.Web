import { apiFetch } from '@/common/api';
import { CreateRoleData, Permission, Role, RolePermissionData, UpdateRoleData } from './types';

export const getPermissions = () => apiFetch<Permission[]>('/permissions');

export const getRoles = () => apiFetch<Role[]>('/roles');

export const createRole = (data: CreateRoleData) => apiFetch<void>('/roles', { method: 'POST', body: data });

export const updateRole = (id: string, data: UpdateRoleData) =>
  apiFetch<void>(`/roles/${id}`, { method: 'PUT', body: data });

export const addRolePermission = (data: RolePermissionData) =>
  apiFetch<void>('/roles/permissions', { method: 'POST', body: data });

export const removeRolePermission = ({ roleId, permissionId }: RolePermissionData) =>
  apiFetch<void>(`/roles/${roleId}/permissions/${permissionId}`, { method: 'DELETE' });
