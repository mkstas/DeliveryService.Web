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

export type LoginData = {
  emailAddress: string;
  password: string;
};

export type RegisterData = {
  name: string;
  emailAddress: string;
  password: string;
};

export type ConfirmData = {
  code: string;
  emailAddress: string;
};

export type ResendData = {
  emailAddress: string;
};
