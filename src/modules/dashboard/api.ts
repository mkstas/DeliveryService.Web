import { apiFetch } from '@/common/api';
import {
  AddEstablishmentAddressData,
  CreateEstablishmentData,
  CreateRoleData,
  Establishment,
  Permission,
  Role,
  RolePermissionData,
  UpdateEstablishmentData,
  UpdateRoleData,
  UserListItem,
  UserRoleData,
} from './types';

export const getUsers = () => apiFetch<UserListItem[]>('/users');

export const getEstablishments = () => apiFetch<Establishment[]>('/establishments');

export const createEstablishment = (data: CreateEstablishmentData) =>
  apiFetch<void>('/establishments', { method: 'POST', body: data });

export const updateEstablishment = (id: string, data: UpdateEstablishmentData) =>
  apiFetch<void>(`/establishments/${id}`, { method: 'PUT', body: data });

export const addEstablishmentAddress = (data: AddEstablishmentAddressData) =>
  apiFetch<void>('/establishments/addresses', { method: 'POST', body: data });

export const addUserRole = (data: UserRoleData) => apiFetch<void>('/users/roles', { method: 'POST', body: data });

export const removeUserRole = ({ userId, roleId }: UserRoleData) =>
  apiFetch<void>(`/users/${userId}/roles/${roleId}`, { method: 'DELETE' });

export const getPermissions = () => apiFetch<Permission[]>('/permissions');

export const getRoles = () => apiFetch<Role[]>('/roles');

export const createRole = (data: CreateRoleData) => apiFetch<void>('/roles', { method: 'POST', body: data });

export const updateRole = (id: string, data: UpdateRoleData) =>
  apiFetch<void>(`/roles/${id}`, { method: 'PUT', body: data });

export const addRolePermission = (data: RolePermissionData) =>
  apiFetch<void>('/roles/permissions', { method: 'POST', body: data });

export const removeRolePermission = ({ roleId, permissionId }: RolePermissionData) =>
  apiFetch<void>(`/roles/${roleId}/permissions/${permissionId}`, { method: 'DELETE' });
