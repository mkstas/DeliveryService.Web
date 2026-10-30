export type Permission = {
  id: string;
  displayName: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type CreateRoleData = {
  name: string;
};

export type UpdateRoleData = {
  name: string;
};

export type RolePermissionData = {
  roleId: string;
  permissionId: string;
};
