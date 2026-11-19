const CONFIRM_PASSWORD_STORAGE_PREFIX = 'store-auth:confirm-password:';

const getStorageKey = (emailAddress: string) => `${CONFIRM_PASSWORD_STORAGE_PREFIX}${emailAddress}`;

export const storeConfirmPassword = (emailAddress: string, password: string) => {
  sessionStorage.setItem(getStorageKey(emailAddress), password);
};

export const takeConfirmPassword = (emailAddress: string) => {
  const key = getStorageKey(emailAddress);
  const password = sessionStorage.getItem(key);

  sessionStorage.removeItem(key);

  return password;
};
