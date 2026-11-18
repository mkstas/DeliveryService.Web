import { LeafyGreenIcon, MapPinIcon } from 'lucide-react';
import type { NamedEntityTexts } from '@/common/crud';

export const restaurantTexts: NamedEntityTexts = {
  icon: MapPinIcon,
  label: 'Название ресторана',
  entityName: 'ресторан',
  conflictMessage: 'Ресторан с таким названием уже существует',
  createTriggerText: 'Создать ресторан',
  createTitle: 'Создание ресторана',
  createDescription: 'Укажите данные нового ресторана',
  updateTitle: 'Обновление ресторана',
  updateDescription: 'Измените данные ресторана',
  editAriaLabel: 'Редактировать ресторан',
};

export const ingredientTexts: NamedEntityTexts = {
  icon: LeafyGreenIcon,
  label: 'Название ингредиента',
  entityName: 'ингредиент',
  conflictMessage: 'Ингредиент с таким названием уже существует',
  createTriggerText: 'Создать ингредиент',
  createTitle: 'Создание ингредиента',
  createDescription: 'Укажите название нового ингредиента',
  updateTitle: 'Обновление ингредиента',
  updateDescription: 'Измените название ингредиента',
  editAriaLabel: 'Редактировать ингредиент',
};
