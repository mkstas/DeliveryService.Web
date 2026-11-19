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
import { dashboardMenuGroups } from './dashboard-sidebar';

const menuItems = dashboardMenuGroups.flatMap(group => group.items);

/**
 * Picks the most specific menu item matching the current path,
 * so that a parent route (e.g. `/dashboard`) does not shadow its children.
 */
const findCurrentItem = (pathname: string) =>
  menuItems
    .filter(item => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];

export const DashboardBreadcrumb: FC = () => {
  const pathname = usePathname();
  const current = findCurrentItem(pathname);
  const isRoot = current?.href === ROUTES.DASHBOARD;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {current && !isRoot ? (
            <BreadcrumbLink render={<Link href={ROUTES.DASHBOARD} />}>Ресторан</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Ресторан</BreadcrumbPage>
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
