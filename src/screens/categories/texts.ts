import type { NamedEntityTexts } from '@/features/crud';
import { LayoutGridCirclesIcon } from 'lucide-react';

export const categoryTexts: NamedEntityTexts = {
  icon: LayoutGridCirclesIcon,
  label: 'Название категории',
  entityName: 'категорию',
  conflictMessage: 'Категория с таким названием уже существует',
  createTriggerText: 'Создать категорию',
  createTitle: 'Создание категории',
  createDescription: 'Укажите название новой категории',
  updateTitle: 'Обновление категории',
  updateDescription: 'Измените название категории',
  editAriaLabel: 'Редактировать категорию',
};
