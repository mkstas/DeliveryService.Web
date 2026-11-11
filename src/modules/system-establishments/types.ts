import { type User } from '@/common/api';

export type EstablishmentAddress = {
  id: string;
  address: string;
};

export type Establishment = {
  id: string;
  name: string;
  businessAccount: string;
  addresses: EstablishmentAddress[];
  users: User[];
};

export type CreateEstablishmentData = {
  name: string;
  businessAccount: string;
};

export type UpdateEstablishmentData = {
  name: string;
  businessAccount: string;
};

export type AddEstablishmentUserData = {
  establishmentId: string;
  emailAddress: string;
};

export type RemoveEstablishmentUserData = {
  establishmentId: string;
  userId: string;
};
