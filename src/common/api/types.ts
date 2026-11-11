export type Permission = {
  id: string;
  displayName: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type User = {
  id: string;
  emailAddress: string;
  name: string;
  imageUrl: string | null;
  roles: Role[];
};
