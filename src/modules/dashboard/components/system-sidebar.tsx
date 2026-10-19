'use client';

import { FC } from 'react';
import {
  ChevronsUpDownIcon,
  DonutIcon,
  GlobeIcon,
  LogOutIcon,
  UserIcon,
  UserShieldIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/common/components';

type User = {
  id: string;
  emailAddress: string;
  name: string;
  imageUrl: string;
};

export const SystemSidebar: FC = () => {
  const { isMobile } = useSidebar();

  const { data } = useQuery<User>({
    queryKey: ['user_me'],
    queryFn: () =>
      fetch('http://localhost:5000/api/v1/users/me', {
        credentials: 'include',
      }).then(res => res.json()),
  });

  const mutation = useMutation({
    mutationFn: () => {
      return fetch('http://localhost:5000/api/v1/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
    },
    onSettled: () => {
      redirect('/');
    },
  });

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuButton size='lg' />}>
                <div className='flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground'>
                  <DonutIcon />
                </div>
                <div>
                  <span className='font-medium'>Delivery Service Inc</span>
                </div>
                <ChevronsUpDownIcon className='ml-auto' />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56'
                side={isMobile ? 'bottom' : 'right'}
                align='start'
              >
                <DropdownMenuItem render={<Link href={'/'} />}>
                  <GlobeIcon />
                  <span>Перейти на сайт</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Пользователи</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href={'/system/users'} />}>
                <UsersIcon />
                <span>Пользователи</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href={'/system/roles'} />}>
                <UserShieldIcon />
                <span>Роли</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuButton size='lg' className='rounded-2xl' />}>
                <Avatar>
                  <AvatarFallback>
                    <UserIcon />
                  </AvatarFallback>
                </Avatar>
                <div className='grid'>
                  <span className='font-medium'>{data?.name}</span>
                  <span className='text-xs'>{data?.emailAddress}</span>
                </div>
                <ChevronsUpDownIcon className='ml-auto' />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onClick={() => mutation.mutate()}
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56'
                side={isMobile ? 'top' : 'right'}
                align={isMobile ? 'start' : 'end'}
              >
                <DropdownMenuItem>
                  <LogOutIcon />
                  Выйти из аккунта
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
