export type UserPermission = {
  id: string;
  displayName: string;
};

export type UserRole = {
  id: string;
  name: string;
  permissions: UserPermission[];
};

export type PaymentMethod = {
  id: string;
  cardNumber: string;
};

export type User = {
  id: string;
  emailAddress: string;
  name: string;
  imageUrl: string | null;
  roles: UserRole[];
  paymentMethods: PaymentMethod[];
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
