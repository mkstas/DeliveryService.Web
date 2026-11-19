'use client';

import { ROUTES } from '@/shared/config';
import { dashboardAccessRule, systemAccessRule } from '@/shared/lib/auth';
import { useUserMe } from '@/shared/lib/auth/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui';
import { FC } from 'react';
import { ChevronsUpDownIcon, DonutIcon, GlobeIcon, LayoutDashboardIcon, ServerIcon } from 'lucide-react';
import Link from 'next/link';

type SidebarOrgMenuProps = {
  title?: string;
};

export const SidebarOrgMenu: FC<SidebarOrgMenuProps> = ({ title = 'Доставички Inc' }) => {
  const { isMobile } = useSidebar();
  const { data: user } = useUserMe();

  const roles = user?.roles ?? [];
  const canOpenSystem = systemAccessRule.allow(roles);
  const canOpenDashboard = dashboardAccessRule.allow(roles);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size='lg' />}>
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-white'>
              <DonutIcon className='size-8' />
            </div>
            <span className='truncate font-medium'>{title}</span>
            <ChevronsUpDownIcon className='ml-auto' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='max-w-56' side={isMobile ? 'bottom' : 'right'}>
            {canOpenSystem && (
              <DropdownMenuItem render={<Link href={ROUTES.SYSTEM} />}>
                <ServerIcon />
                <span>Администрирование</span>
              </DropdownMenuItem>
            )}
            {canOpenDashboard && (
              <DropdownMenuItem render={<Link href={ROUTES.DASHBOARD} />}>
                <LayoutDashboardIcon />
                <span>Ресторан</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href={ROUTES.STORE} />}>
              <GlobeIcon />
              <span>Перейти на сайт</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
