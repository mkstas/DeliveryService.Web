import { API_HOST, API_URL } from './env';

const absoluteUrlPattern = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i;

const buildImageUrl = (imageName: string | null | undefined, imagePath: string): string | undefined => {
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

  if (normalizedImageName.startsWith('static/')) {
    return `${API_URL.replace(/\/+$/, '')}/${normalizedImageName}`;
  }

  return `${API_URL.replace(/\/+$/, '')}/${imagePath}/${encodeURIComponent(normalizedImageName)}`;
};

export const getUserImageUrl = (imageName: string | null | undefined): string | undefined =>
  buildImageUrl(imageName, 'static/users');

export const getRestaurantImageUrl = (imageName: string | null | undefined): string | undefined =>
  buildImageUrl(imageName, 'static/restaurants');

export const getDishImageUrl = (imageName: string | null | undefined): string | undefined =>
  buildImageUrl(imageName, 'static/dishes');
