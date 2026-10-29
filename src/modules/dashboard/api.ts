import { apiFetch } from '@/common/api';
import { Permission, Role } from './types';

export const getPermissions = () => apiFetch<Permission[]>('/permissions');

export const getRoles = () => apiFetch<Role[]>('/roles');
