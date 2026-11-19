'use client';

import { ROUTES } from '@/shared/config';
import { useMyRestaurant } from '@/shared/lib/auth/session';
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
import { SidebarOrgMenu } from '@/widgets/system-sidebar/components/sidebar-org-menu';
import { SidebarUserMenu } from '@/widgets/system-sidebar/components/sidebar-user-menu';
import { type FC } from 'react';
import { ClipboardListIcon, LeafyGreenIcon, LucideIcon, SoupIcon, StoreIcon } from 'lucide-react';
import Link from 'next/link';

type MenuItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type MenuGroup = {
  label: string;
  items: MenuItem[];
};

export const dashboardMenuGroups: MenuGroup[] = [
  {
    label: 'Ресторан',
    items: [{ href: ROUTES.DASHBOARD, label: 'Мой ресторан', icon: StoreIcon }],
  },
  {
    label: 'Меню',
    items: [
      { href: ROUTES.DASHBOARD_INGREDIENTS, label: 'Ингредиенты', icon: LeafyGreenIcon },
      { href: ROUTES.DASHBOARD_DISHES, label: 'Блюда', icon: SoupIcon },
    ],
  },
  {
    label: 'Заказы',
    items: [{ href: ROUTES.DASHBOARD_ORDERS, label: 'Заказы', icon: ClipboardListIcon }],
  },
];

export const DashboardSidebar: FC = () => {
  const { data: restaurant } = useMyRestaurant();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarOrgMenu title={restaurant?.name ?? 'Заведение'} />
      </SidebarHeader>
      <SidebarContent>
        {dashboardMenuGroups.map(group => (
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
