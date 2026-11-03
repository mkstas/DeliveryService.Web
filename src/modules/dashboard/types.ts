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

export type EstablishmentAddress = {
  id: string;
  address: string;
};

export type Establishment = {
  id: string;
  name: string;
  businessAccount: string;
  addresses: EstablishmentAddress[];
};

export type CreateEstablishmentData = {
  name: string;
  businessAccount: string;
};

export type UpdateEstablishmentData = {
  name: string;
  businessAccount: string;
};

export type AddEstablishmentAddressData = {
  establishmentId: string;
  address: string;
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
