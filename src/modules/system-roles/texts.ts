import { UserShieldIcon } from 'lucide-react';
import type { NamedEntityTexts } from '@/common/crud';

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
