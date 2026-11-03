import { apiFetch } from '@/common/api';
import { UpdateUserBioData, UpdateUserEmailData } from './types';

export const updateUserBio = (data: UpdateUserBioData) =>
  apiFetch<void>('/users/me/bio', { method: 'PATCH', body: data });

export const updateUserEmail = (data: UpdateUserEmailData) =>
  apiFetch<void>('/users/me/email', { method: 'PATCH', body: data });
