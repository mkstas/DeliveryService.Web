import { apiEndpoints, http, queryKeys } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateDishData,
  CreateDishSpecificationData,
  UpdateDishData,
  UpdateDishSpecificationData,
  UploadDishImageData,
} from '../types';

type WithId<T> = T & { id: string };
type UpdateDishSpecificationVariables = UpdateDishSpecificationData & { id: string };

const createImageFormData = (file: File) => {
  const body = new FormData();
  body.append('file', file);

  return body;
};

export const useCreateDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDishData) => http<void>(apiEndpoints.dishes.all, { method: 'POST', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.dishes }),
  });
};

export const useUpdateDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: WithId<UpdateDishData>) =>
      http<void>(apiEndpoints.dishes.byId(id), { method: 'PUT', body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.dishes }),
  });
};

export const useDeleteDish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => http<void>(apiEndpoints.dishes.byId(id), { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dishes });
      queryClient.invalidateQueries({ queryKey: queryKeys.cartItems });
    },
  });
};

export const useCreateDishSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDishSpecificationData) =>
      http<void>(apiEndpoints.dishSpecifications.all, { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dishes });
      queryClient.invalidateQueries({ queryKey: queryKeys.dishSpecifications });
    },
  });
};

export const useUpdateDishSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, value }: UpdateDishSpecificationVariables) =>
      http<void>(apiEndpoints.dishSpecifications.byId(id), { method: 'PUT', body: { value } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dishes });
      queryClient.invalidateQueries({ queryKey: queryKeys.dishSpecifications });
    },
  });
};

export const useDeleteDishSpecification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => http<void>(apiEndpoints.dishSpecifications.byId(id), { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dishes });
      queryClient.invalidateQueries({ queryKey: queryKeys.dishSpecifications });
    },
  });
};

export const useUploadDishImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: UploadDishImageData) =>
      http<void>(apiEndpoints.static.dishImage(id), { method: 'POST', body: createImageFormData(file) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.dishes }),
  });
};

export const useRemoveDishImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => http<void>(apiEndpoints.static.dishImage(id), { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.dishes }),
  });
};

export const useAddDishIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dishId, ingredientId }: { dishId: string; ingredientId: string }) =>
      http<void>(apiEndpoints.dishes.ingredients(dishId), { method: 'POST', body: { ingredientId } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.dishes }),
  });
};

export const useRemoveDishIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dishId, dishIngredientId }: { dishId: string; dishIngredientId: string }) =>
      http<void>(apiEndpoints.dishes.ingredient(dishId, dishIngredientId), { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.dishes }),
  });
};
