import { apiFetch } from '@/common/api';
import type { LoginData, RegisterData, User } from './types';

export const login = (data: LoginData) => apiFetch<void>('/auth/login', { method: 'POST', body: data });

export const register = (data: RegisterData) => apiFetch<void>('/auth/register', { method: 'POST', body: data });

export const logout = () => apiFetch<void>('/auth/logout', { method: 'DELETE' });

export const fetchMe = () => apiFetch<User>('/users/me');
