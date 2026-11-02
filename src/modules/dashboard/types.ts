export type Permission = {
  id: string;
  displayName: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type UserListItem = {
  id: string;
  name: string;
  emailAddress: string;
  imageUrl: string | null;
  roles: Role[];
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

export type UserRoleData = {
  userId: string;
  roleId: string;
};
