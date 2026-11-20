'use client';

import { getUserImageUrl, ROUTES } from '@/shared/config';
import { useLogout, useUserMe } from '@/shared/lib/auth/hooks';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
  useSidebar,
} from '@/shared/ui';
import { FC } from 'react';
import { ChevronsUpDownIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

export const SidebarUserMenu: FC = () => {
  const { isMobile } = useSidebar();
  const { data: user, isLoading } = useUserMe();
  const logout = useLogout();

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className='flex items-center gap-2 px-3 py-2'>
            <Skeleton className='size-8 rounded-lg' />
            <div className='grid gap-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-3 w-28' />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size='lg' className='rounded-lg' />}>
            <Avatar>
              {user?.imageUrl && <AvatarImage src={getUserImageUrl(user.imageUrl)} alt={`Avatar ${user.name}`} />}
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <div className='grid'>
              <span className='font-medium'>{user?.name}</span>
              <span className='truncate text-xs'>{user?.emailAddress}</span>
            </div>
            <ChevronsUpDownIcon className='ml-auto' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' side={isMobile ? 'top' : 'right'} align={isMobile ? 'start' : 'end'}>
            <DropdownMenuItem render={<Link href={ROUTES.ACCOUNT} />}>
              <UserIcon />
              Аккаунт
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout.mutate()}>
              <LogOutIcon />
              Выйти из аккунта
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
