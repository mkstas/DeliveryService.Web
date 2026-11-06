import { User } from '../store-auth';

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
