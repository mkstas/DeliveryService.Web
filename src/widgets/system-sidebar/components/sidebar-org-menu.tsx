'use client';

import { ROUTES } from '@/shared/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/ui';
import { FC } from 'react';
import { ChevronsUpDownIcon, GlobeIcon, SnailIcon } from 'lucide-react';
import Link from 'next/link';

type SidebarOrgMenuProps = {
  title?: string;
};

export const SidebarOrgMenu: FC<SidebarOrgMenuProps> = ({ title = 'Доставички Inc' }) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size='lg' />}>
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-white'>
              <SnailIcon className='size-8' />
            </div>
            <span className='truncate font-medium'>{title}</span>
            <ChevronsUpDownIcon className='ml-auto' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' side={isMobile ? 'bottom' : 'right'}>
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
