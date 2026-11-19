'use client';

import { ROUTES } from '@/shared/config';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui';
import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuGroups } from './system-sidebar';

const menuItems = menuGroups.flatMap(group => group.items);

/**
 * Picks the most specific menu item matching the current path,
 * so that a parent route cannot shadow its children.
 */
const findCurrentItem = (pathname: string) =>
  menuItems
    .filter(item => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];

export const SystemBreadcrumb: FC = () => {
  const pathname = usePathname();
  const current = findCurrentItem(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {current ? (
            <BreadcrumbLink render={<Link href={ROUTES.SYSTEM} />}>Система</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Система</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {current && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{current.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
