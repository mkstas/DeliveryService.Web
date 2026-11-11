'use client';

import { FC } from 'react';
import { ChevronsUpDownIcon, DonutIcon, GlobeIcon } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/common/components';
import { ROUTES } from '@/common/config';

export const SidebarOrgMenu: FC = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size='lg' />}>
            <div className='flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-white'>
              <DonutIcon className='size-8' />
            </div>
            <span className='truncate font-medium'>Доставички Inc</span>
            <ChevronsUpDownIcon className='ml-auto' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='max-w-56' side={isMobile ? 'bottom' : 'right'}>
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
