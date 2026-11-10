import { API_HOST, API_URL } from './env';

const absoluteUrlPattern = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i;
const userImagePath = 'static/users';

export const getUserImageUrl = (imageName: string | null | undefined): string | undefined => {
  if (!imageName) {
    return undefined;
  }

  if (absoluteUrlPattern.test(imageName)) {
    return imageName;
  }

  const normalizedImageName = imageName.replace(/^\/+/, '');

  if (normalizedImageName.startsWith('api/')) {
    return `${API_HOST.replace(/\/+$/, '')}/${normalizedImageName}`;
  }

  if (normalizedImageName.startsWith(`${userImagePath}/`)) {
    return `${API_URL.replace(/\/+$/, '')}/${normalizedImageName}`;
  }

  return `${API_URL.replace(/\/+$/, '')}/${userImagePath}/${encodeURIComponent(normalizedImageName)}`;
};
