import { ROUTES } from '@/shared/config';
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
} from '@/shared/ui';
import { type FC } from 'react';
import {
  ClipboardListIcon,
  ClipboardPenLineIcon,
  LayoutGridCirclesIcon,
  LucideIcon,
  MapPinIcon,
  SoupIcon,
  UserShieldIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
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
    items: [{ href: ROUTES.SYSTEM_RESTAURANTS, label: 'Рестораны', icon: MapPinIcon }],
  },
  {
    label: 'Продукты',
    items: [
      { href: ROUTES.SYSTEM_CATEGORIES, label: 'Категории', icon: LayoutGridCirclesIcon },
      { href: ROUTES.SYSTEM_SPECIFICATIONS, label: 'Характеристики', icon: ClipboardPenLineIcon },
      { href: ROUTES.SYSTEM_DISHES, label: 'Блюда', icon: SoupIcon },
    ],
  },
  {
    label: 'Заказы',
    items: [{ href: ROUTES.SYSTEM_ORDERS, label: 'Заказы', icon: ClipboardListIcon }],
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
