import { apiFetch } from '@/common/api';
import type { ConfirmData, LoginData, RegisterData, ResendData, User } from './types';

export const login = (data: LoginData) => apiFetch<void>('/auth/login', { method: 'POST', body: data });

export const register = (data: RegisterData) => apiFetch<void>('/auth/register', { method: 'POST', body: data });

export const logout = () => apiFetch<void>('/auth/logout', { method: 'DELETE' });

export const confirm = (data: ConfirmData) => apiFetch<void>('/auth/email/confirm', { method: 'POST', body: data });

export const resend = (data: ResendData) => apiFetch<void>('/auth/email/resend', { method: 'POST', body: data });

export const fetchMe = () => apiFetch<User>('/users/me');
