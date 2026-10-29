export type User = {
  id: string;
  emailAddress: string;
  name: string;
  imageUrl: string;
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
