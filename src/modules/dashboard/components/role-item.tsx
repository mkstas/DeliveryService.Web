'use client';

import { FC, useState } from 'react';
import { PencilIcon } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger, Button } from '@/common/components';
import { useRolePermissions } from '../hooks/useRolePermissions';
import { pluralize } from '../model/pluralize';
import { Permission, Role } from '../types';
import { RoleDialog } from './role-dialog';
import { RolePermissions } from './role-permissions';

type RoleItemProps = {
  role: Role;
  permissions: Permission[];
};

export const RoleItem: FC<RoleItemProps> = ({ role, permissions }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { selected, pendingIds, error, toggle } = useRolePermissions(role);

  return (
    <AccordionItem className='px-0'>
      <div className='flex items-center gap-3 px-5 py-4'>
        <Button
          variant='ghost'
          size='icon'
          className='size-10 shrink-0 rounded-xl text-muted-foreground'
          onClick={() => setIsEditOpen(true)}
          aria-label={`Редактировать роль ${role.name}`}
        >
          <PencilIcon />
        </Button>
        <div className='flex-1'>
          <AccordionTrigger className='items-center px-0 py-0 hover:no-underline'>
            <div className='flex flex-col gap-0.5 text-left'>
              <span className='text-sm font-semibold'>{role.name}</span>
              <span className='text-xs font-normal text-muted-foreground'>
                {selected.length} {pluralize(selected.length, 'разрешение', 'разрешения', 'разрешений')}
              </span>
            </div>
          </AccordionTrigger>
        </div>
      </div>

      <AccordionContent className='px-5'>
        <RolePermissions
          role={role}
          permissions={permissions}
          selected={selected}
          pendingIds={pendingIds}
          error={error}
          onToggle={toggle}
        />
      </AccordionContent>

      <RoleDialog open={isEditOpen} onOpenChange={setIsEditOpen} role={role} />
    </AccordionItem>
  );
};
