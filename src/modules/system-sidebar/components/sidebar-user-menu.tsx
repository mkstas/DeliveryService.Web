'use client';

import { FC } from 'react';
import { ChevronsUpDownIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
} from '@/common/components';
import { getUserImageUrl, ROUTES } from '@/common/config';
import { useLogout, useUserMe } from '@/modules/store-auth';

export const SidebarUserMenu: FC = () => {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data: user, isLoading } = useUserMe();
  const logout = useLogout();

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className='flex items-center gap-2 px-3 py-2'>
            <Skeleton className='size-8 rounded-full' />
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
              <span className='text-xs truncate'>{user?.emailAddress}</span>
            </div>
            <ChevronsUpDownIcon className='ml-auto' />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='max-w-56'
            side={isMobile ? 'top' : 'right'}
            align={isMobile ? 'start' : 'end'}
          >
            <DropdownMenuItem render={<Link href={ROUTES.ACCOUNT} />}>
              <UserIcon />
              Аккаунт
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout.mutate(undefined, {
                  onSuccess: () => router.push(ROUTES.STORE),
                });
              }}
            >
              <LogOutIcon />
              Выйти из аккунта
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
