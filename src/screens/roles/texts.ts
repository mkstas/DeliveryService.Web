import type { NamedEntityTexts } from '@/features/crud';
import { UserShieldIcon } from 'lucide-react';

export const roleTexts: NamedEntityTexts = {
  icon: UserShieldIcon,
  label: 'Название роли',
  entityName: 'роль',
  conflictMessage: 'Роль с таким названием уже существует',
  createTriggerText: 'Создать роль',
  createTitle: 'Создание роли',
  createDescription: 'Укажите название новой роли',
  updateTitle: 'Обновление роли',
  updateDescription: 'Измените название роли',
  editAriaLabel: 'Редактировать роль',
};
