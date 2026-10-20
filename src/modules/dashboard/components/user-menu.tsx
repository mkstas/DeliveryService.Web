'use client';

import { FC } from 'react';
import { ChevronsUpDownIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
  useSidebar,
} from '@/common/components';
import { API_URL, ROUTES } from '@/common/config';
import { useLogout, useSession } from '@/modules/auth';

export const UserMenu: FC = () => {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data: user, isPending } = useSession();
  const logout = useLogout();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {isPending ? (
          <div className='flex items-center gap-2 px-3 py-2'>
            <Skeleton className='size-8' />
            <div className='grid gap-1'>
              <Skeleton className='h-5 w-16' />
              <Skeleton className='h-4 w-28' />
            </div>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger render={<SidebarMenuButton size='lg' className='rounded-2xl' />}>
              <Avatar>
                <AvatarImage src={`${API_URL}/static/${user?.imageUrl}`} alt={`Avatar ${user?.name}`} />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <div className='grid'>
                <span className='font-medium'>{user?.name}</span>
                <span className='text-xs'>{user?.emailAddress}</span>
              </div>
              <ChevronsUpDownIcon className='ml-auto' />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onClick={() => {
                logout.mutate(undefined, {
                  onSuccess: () => router.push(ROUTES.STORE),
                });
              }}
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
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
