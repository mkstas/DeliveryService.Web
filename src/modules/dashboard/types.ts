export type Permission = {
  id: string;
  displayName: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};
