'use client';

import { FC, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components';
import { usePermissions } from '../hooks/usePermissions';
import { useRoles } from '../hooks/useRoles';
import { Permission, Role } from '../types';

type RolePermissionsTableProps = {
  role: Role;
  permissions: Permission[];
};

const RolePermissionsTable: FC<RolePermissionsTableProps> = ({ role, permissions }) => {
  const [selected, setSelected] = useState<string[]>(() => role.permissions.map(p => p.id));

  const togglePermission = (id: string, checked: boolean) => {
    setSelected(prev => (checked ? [...prev, id] : prev.filter(permissionId => permissionId !== id)));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Разрешение</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map(permission => (
          <TableRow key={permission.id}>
            <TableCell>
              <Label htmlFor={`${role.id}-${permission.id}`}>{permission.displayName}</Label>
            </TableCell>
            <TableCell className='text-right'>
              <Checkbox
                id={`${role.id}-${permission.id}`}
                checked={selected.includes(permission.id)}
                onCheckedChange={checked => togglePermission(permission.id, checked === true)}
                className='ml-auto'
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const SystemRoles: FC = () => {
  const { data: permissions, isPending: isPendingPermissions } = usePermissions();
  const { data: roles, isPending: isPendingRoles } = useRoles();

  if (isPendingPermissions || isPendingRoles) {
    return <div>Loading</div>;
  }

  return (
    <Accordion className='rounded-lg border'>
      {roles?.map(role => (
        <AccordionItem key={role.id} className='border-b px-4 last:border-b-0'>
          <AccordionTrigger>{role.name}</AccordionTrigger>
          <AccordionContent>
            <RolePermissionsTable role={role} permissions={permissions ?? []} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

