import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEndpoints, http, queryKeys } from '@/common/api';
import {
  AddRestaurantAddressData,
  AddRestaurantIngredientData,
  AddRestaurantUserData,
  CreateRestaurantData,
  RemoveRestaurantAddressData,
  RemoveRestaurantIngredientData,
  RemoveRestaurantUserData,
  UpdateRestaurantAddressData,
  UpdateRestaurantData,
  UpdateRestaurantIngredientData,
  UploadRestaurantImageData,
} from '../types';

type WithId<T> = T & { id: string };
type AddressVariables = UpdateRestaurantAddressData & { restaurantId: string; addressId: string };
type IngredientVariables = UpdateRestaurantIngredientData & { restaurantId: string; ingredientId: string };

const createImageFormData = (file: File) => {
  const body = new FormData();
  body.append('file', file);

  return body;
};

const useInvalidateRestaurants = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.restaurants });
    queryClient.invalidateQueries({ queryKey: queryKeys.dishes });
  };
};

export const useCreateRestaurant = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: (data: CreateRestaurantData) =>
      http<void>(apiEndpoints.restaurants.all, { method: 'POST', body: data }),
    onSuccess: invalidate,
  });
};

export const useUpdateRestaurant = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: ({ id, ...data }: WithId<UpdateRestaurantData>) =>
      http<void>(apiEndpoints.restaurants.byId(id), { method: 'PUT', body: data }),
    onSuccess: invalidate,
  });
};

export const useAddRestaurantUser = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: (data: AddRestaurantUserData) =>
      http<void>(apiEndpoints.restaurants.users, { method: 'POST', body: data }),
    onSuccess: invalidate,
  });
};

export const useRemoveRestaurantUser = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: ({ restaurantId, userId }: RemoveRestaurantUserData) =>
      http<void>(apiEndpoints.restaurants.user(restaurantId, userId), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};

export const useAddRestaurantAddress = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: (data: AddRestaurantAddressData) =>
      http<void>(apiEndpoints.restaurants.addresses, { method: 'POST', body: data }),
    onSuccess: invalidate,
  });
};

export const useUpdateRestaurantAddress = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: ({ restaurantId, addressId, address }: AddressVariables) =>
      http<void>(apiEndpoints.restaurants.address(restaurantId, addressId), { method: 'PUT', body: { address } }),
    onSuccess: invalidate,
  });
};

export const useRemoveRestaurantAddress = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: ({ restaurantId, addressId }: RemoveRestaurantAddressData) =>
      http<void>(apiEndpoints.restaurants.address(restaurantId, addressId), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};

export const useAddRestaurantIngredient = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: (data: AddRestaurantIngredientData) =>
      http<void>(apiEndpoints.restaurants.ingredients, { method: 'POST', body: data }),
    onSuccess: invalidate,
  });
};

export const useUpdateRestaurantIngredient = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: ({ restaurantId, ingredientId, name }: IngredientVariables) =>
      http<void>(apiEndpoints.restaurants.ingredient(restaurantId, ingredientId), { method: 'PUT', body: { name } }),
    onSuccess: invalidate,
  });
};

export const useRemoveRestaurantIngredient = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: ({ restaurantId, ingredientId }: RemoveRestaurantIngredientData) =>
      http<void>(apiEndpoints.restaurants.ingredient(restaurantId, ingredientId), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};

export const useUploadRestaurantImage = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: ({ id, file }: UploadRestaurantImageData) =>
      http<void>(apiEndpoints.static.restaurantImage(id), { method: 'POST', body: createImageFormData(file) }),
    onSuccess: invalidate,
  });
};

export const useRemoveRestaurantImage = () => {
  const invalidate = useInvalidateRestaurants();

  return useMutation({
    mutationFn: (id: string) => http<void>(apiEndpoints.static.restaurantImage(id), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};
