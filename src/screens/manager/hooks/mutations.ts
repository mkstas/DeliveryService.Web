import { apiEndpoints, http, queryKeys } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateMyDishData,
  CreateMyDishSpecificationData,
  UpdateMyDishSpecificationData,
  UpdateMyRestaurantData,
} from '../types';

const createImageFormData = (file: File) => {
  const body = new FormData();
  body.append('file', file);

  return body;
};

const useInvalidateRestaurant = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.myRestaurant });
    queryClient.invalidateQueries({ queryKey: queryKeys.restaurants });
  };
};

/**
 * Invalidates dish-related caches. Dish queries are keyed by `[...dishes, 'me', search]`,
 * so invalidating the `dishes` prefix refreshes every manager dish list.
 */
const useInvalidateDishes = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.dishes });
    queryClient.invalidateQueries({ queryKey: queryKeys.myRestaurant });
    queryClient.invalidateQueries({ queryKey: queryKeys.dishSpecifications });
  };
};

/**
 * Updates the restaurant assigned to the current manager.
 */
export const useUpdateMyRestaurant = () => {
  const invalidate = useInvalidateRestaurant();

  return useMutation({
    mutationFn: (data: UpdateMyRestaurantData) =>
      http<void>(apiEndpoints.restaurants.me, { method: 'PUT', body: data }),
    onSuccess: invalidate,
  });
};

/**
 * Uploads the image of the current manager restaurant.
 */
export const useUploadMyRestaurantImage = () => {
  const invalidate = useInvalidateRestaurant();

  return useMutation({
    mutationFn: (file: File) =>
      http<void>(apiEndpoints.static.myRestaurantImage, { method: 'POST', body: createImageFormData(file) }),
    onSuccess: invalidate,
  });
};

/**
 * Removes the image of the current manager restaurant.
 */
export const useRemoveMyRestaurantImage = () => {
  const invalidate = useInvalidateRestaurant();

  return useMutation({
    mutationFn: () => http<void>(apiEndpoints.static.myRestaurantImage, { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};

/**
 * Adds an address to the current manager restaurant.
 */
export const useAddMyRestaurantAddress = () => {
  const invalidate = useInvalidateRestaurant();

  return useMutation({
    mutationFn: (address: string) =>
      http<void>(apiEndpoints.restaurants.myAddresses, { method: 'POST', body: { address } }),
    onSuccess: invalidate,
  });
};

/**
 * Updates an address of the current manager restaurant.
 */
export const useUpdateMyRestaurantAddress = () => {
  const invalidate = useInvalidateRestaurant();

  return useMutation({
    mutationFn: ({ addressId, address }: { addressId: string; address: string }) =>
      http<void>(apiEndpoints.restaurants.myAddress(addressId), { method: 'PUT', body: { address } }),
    onSuccess: invalidate,
  });
};

/**
 * Removes an address from the current manager restaurant.
 */
export const useRemoveMyRestaurantAddress = () => {
  const invalidate = useInvalidateRestaurant();

  return useMutation({
    mutationFn: (addressId: string) => http<void>(apiEndpoints.restaurants.myAddress(addressId), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};

/**
 * Adds an ingredient to the current manager restaurant.
 */
export const useAddMyRestaurantIngredient = () => {
  const invalidate = useInvalidateRestaurant();

  return useMutation({
    mutationFn: (name: string) =>
      http<void>(apiEndpoints.restaurants.myIngredients, { method: 'POST', body: { name } }),
    onSuccess: invalidate,
  });
};

/**
 * Updates an ingredient of the current manager restaurant.
 */
export const useUpdateMyRestaurantIngredient = () => {
  const invalidate = useInvalidateRestaurant();

  return useMutation({
    mutationFn: ({ ingredientId, name }: { ingredientId: string; name: string }) =>
      http<void>(apiEndpoints.restaurants.myIngredient(ingredientId), { method: 'PUT', body: { name } }),
    onSuccess: invalidate,
  });
};

/**
 * Removes an ingredient from the current manager restaurant.
 */
export const useRemoveMyRestaurantIngredient = () => {
  const invalidate = useInvalidateRestaurant();

  return useMutation({
    mutationFn: (ingredientId: string) =>
      http<void>(apiEndpoints.restaurants.myIngredient(ingredientId), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};

/**
 * Creates a dish in the current manager restaurant.
 */
export const useCreateMyDish = () => {
  const invalidate = useInvalidateDishes();

  return useMutation({
    mutationFn: (data: CreateMyDishData) => http<void>(apiEndpoints.dishes.me, { method: 'POST', body: data }),
    onSuccess: invalidate,
  });
};

/**
 * Uploads the image of a dish of the current manager restaurant.
 */
export const useUploadMyDishImage = () => {
  const invalidate = useInvalidateDishes();

  return useMutation({
    mutationFn: ({ dishId, file }: { dishId: string; file: File }) =>
      http<void>(apiEndpoints.static.myDishImage(dishId), { method: 'POST', body: createImageFormData(file) }),
    onSuccess: invalidate,
  });
};

/**
 * Removes the image of a dish of the current manager restaurant.
 */
export const useRemoveMyDishImage = () => {
  const invalidate = useInvalidateDishes();

  return useMutation({
    mutationFn: (dishId: string) => http<void>(apiEndpoints.static.myDishImage(dishId), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};

/**
 * Adds an ingredient to a dish of the current manager restaurant.
 */
export const useAddMyDishIngredient = () => {
  const invalidate = useInvalidateDishes();

  return useMutation({
    mutationFn: ({ dishId, ingredientId }: { dishId: string; ingredientId: string }) =>
      http<void>(apiEndpoints.dishes.myIngredients(dishId), { method: 'POST', body: { ingredientId } }),
    onSuccess: invalidate,
  });
};

/**
 * Removes an ingredient from a dish of the current manager restaurant.
 */
export const useRemoveMyDishIngredient = () => {
  const invalidate = useInvalidateDishes();

  return useMutation({
    mutationFn: ({ dishId, dishIngredientId }: { dishId: string; dishIngredientId: string }) =>
      http<void>(apiEndpoints.dishes.myIngredient(dishId, dishIngredientId), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};

/**
 * Assigns a specification value to a dish of the current manager restaurant.
 */
export const useCreateMyDishSpecification = () => {
  const invalidate = useInvalidateDishes();

  return useMutation({
    mutationFn: (data: CreateMyDishSpecificationData) =>
      http<void>(apiEndpoints.dishSpecifications.me, { method: 'POST', body: data }),
    onSuccess: invalidate,
  });
};

/**
 * Updates a specification value of a dish of the current manager restaurant.
 */
export const useUpdateMyDishSpecification = () => {
  const invalidate = useInvalidateDishes();

  return useMutation({
    mutationFn: ({ id, value }: { id: string } & UpdateMyDishSpecificationData) =>
      http<void>(apiEndpoints.dishSpecifications.meById(id), { method: 'PUT', body: { value } }),
    onSuccess: invalidate,
  });
};

/**
 * Removes a specification value from a dish of the current manager restaurant.
 */
export const useRemoveMyDishSpecification = () => {
  const invalidate = useInvalidateDishes();

  return useMutation({
    mutationFn: (id: string) => http<void>(apiEndpoints.dishSpecifications.meById(id), { method: 'DELETE' }),
    onSuccess: invalidate,
  });
};
