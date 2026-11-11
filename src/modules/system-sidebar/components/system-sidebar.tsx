import { FC } from 'react';
import {
  ClipboardPenLineIcon,
  LayoutGridCirclesIcon,
  LeafyGreenIcon,
  LucideIcon,
  MapPinIcon,
  PlusCircleIcon,
  SoupIcon,
  UserShieldIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/common/components';
import { ROUTES } from '@/common/config';
import { SidebarOrgMenu } from './sidebar-org-menu';
import { SidebarUserMenu } from './sidebar-user-menu';

type MenuItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type MenuGroup = {
  label: string;
  items: MenuItem[];
};

export const menuGroups: MenuGroup[] = [
  {
    label: 'Пользователи',
    items: [
      { href: ROUTES.SYSTEM_USERS, label: 'Пользователи', icon: UsersIcon },
      { href: ROUTES.SYSTEM_ROLES, label: 'Роли', icon: UserShieldIcon },
    ],
  },
  {
    label: 'Партнеры',
    items: [{ href: ROUTES.SYSTEM_ESTABLISHMENTS, label: 'Заведения', icon: MapPinIcon }],
  },
  {
    label: 'Продукты',
    items: [
      { href: ROUTES.SYSTEM_CATEGORIES, label: 'Категории', icon: LayoutGridCirclesIcon },
      { href: ROUTES.SYSTEM_SPECIFICATIONS, label: 'Характеристики', icon: ClipboardPenLineIcon },
      { href: ROUTES.SYSTEM_INGREDIENTS, label: 'Ингредиенты', icon: LeafyGreenIcon },
      { href: ROUTES.SYSTEM_MODIFIERS, label: 'Модификаторы', icon: PlusCircleIcon },
      { href: ROUTES.SYSTEM_DISHES, label: 'Блюда', icon: SoupIcon },
    ],
  },
];

export const SystemSidebar: FC = () => {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarOrgMenu />
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map(group => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map(item => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton render={<Link href={item.href} />}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  );
};
