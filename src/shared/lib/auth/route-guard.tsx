'use client';

import { type UserRole } from '@/shared/api';
import { ROUTES } from '@/shared/config';
import { Skeleton } from '@/shared/ui';
import { type FC, type ReactNode, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUserMe } from './hooks';
import { ROLE_NAMES } from './permissions';

export type AccessRule = {
  /** Returns whether the given roles satisfy the rule. */
  allow: (roles: UserRole[]) => boolean;
};

const hasRole = (roles: UserRole[], roleName: string): boolean => roles.some(role => role.name === roleName);

/**
 * The system section is available to system administrators only.
 */
export const systemAccessRule: AccessRule = {
  allow: roles => hasRole(roles, ROLE_NAMES.administrator),
};

/**
 * The dashboard section is available to restaurant managers only.
 */
export const dashboardAccessRule: AccessRule = {
  allow: roles => hasRole(roles, ROLE_NAMES.manager),
};

/**
 * Returns the section the user belongs to, or `null` when the user has no back-office access at all.
 * Administrators take precedence when a user holds both roles.
 */
export const resolveHomeSection = (roles: UserRole[]): string | null => {
  if (systemAccessRule.allow(roles)) {
    return ROUTES.SYSTEM;
  }

  if (dashboardAccessRule.allow(roles)) {
    return ROUTES.DASHBOARD;
  }

  return null;
};

type RouteGuardProps = {
  rule: AccessRule;
  section?: string;
  children: ReactNode;
};

/**
 * Renders children only when the current user satisfies the access rule.
 * Redirects anonymous users to the login page and users without access to their own section (or the store).
 */
export const RouteGuard: FC<RouteGuardProps> = ({ rule, section, children }) => {
  const router = useRouter();
  const { data: user, isLoading } = useUserMe();

  const isAnonymous = !isLoading && !user;
  const roles = useMemo(() => user?.roles ?? [], [user]);
  const isAllowed = !isLoading && !isAnonymous && rule.allow(roles);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAnonymous) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (!isAllowed) {
      const home = resolveHomeSection(roles);
      // Redirect to the user's own section; avoid looping back to the current one.
      router.replace(home !== null && home !== section ? home : ROUTES.STORE);
    }
  }, [isLoading, isAnonymous, isAllowed, roles, router, section]);

  if (isLoading || isAnonymous || !isAllowed) {
    return (
      <div className='flex flex-col gap-4 p-6'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-24 w-full' />
      </div>
    );
  }

  return <>{children}</>;
};
