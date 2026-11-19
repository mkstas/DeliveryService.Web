import type { NamedEntityTexts } from '@/features/crud';
import { ClipboardPenLineIcon } from 'lucide-react';

export const specificationTexts: NamedEntityTexts = {
  icon: ClipboardPenLineIcon,
  label: 'Название характеристики',
  entityName: 'характеристику',
  conflictMessage: 'Характеристика с таким названием уже существует',
  createTriggerText: 'Создать характеристику',
  createTitle: 'Создание характеристики',
  createDescription: 'Укажите название новой характеристики',
  updateTitle: 'Обновление характеристики',
  updateDescription: 'Измените название характеристики',
  editAriaLabel: 'Редактировать характеристику',
};
