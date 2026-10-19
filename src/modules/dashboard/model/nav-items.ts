import { type LucideIcon, UserShieldIcon, UsersIcon } from 'lucide-react';
import { ROUTES } from '@/common/config';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: 'Пользователи',
    items: [
      { href: ROUTES.DASH_SYSTEM_USERS, label: 'Пользователи', icon: UsersIcon },
      { href: ROUTES.DASH_SYSTEM_ROLES, label: 'Роли', icon: UserShieldIcon },
    ],
  },
];
