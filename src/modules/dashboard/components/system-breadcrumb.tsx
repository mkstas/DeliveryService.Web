'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/common/components';
import { ROUTES } from '@/common/config';
import { navGroups } from '../model/nav-items';

const navItems = navGroups.flatMap(group => group.items);

export const SystemBreadcrumb: FC = () => {
  const pathname = usePathname();
  const current = navItems.find(item => pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {current ? (
            <BreadcrumbLink render={<Link href={ROUTES.DASH_SYSTEM} />}>Система</BreadcrumbLink>
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
