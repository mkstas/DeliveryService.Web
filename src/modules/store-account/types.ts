export type UpdateUserBioData = {
  name: string;
};

export type UpdateUserEmailData = {
  emailAddress: string;
};

export type ConfirmUserEmailData = {
  code: string;
  emailAddress: string;
};

export type ResendUserEmailData = {
  emailAddress: string;
};
