export type CreateDishData = {
  restaurantId: string;
  categoryId: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
};

export type UpdateDishData = {
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
};

export type UploadDishImageData = {
  id: string;
  file: File;
};

export type CreateDishSpecificationData = {
  dishId: string;
  specificationId: string;
  value: string;
};

export type UpdateDishSpecificationData = {
  value: string;
};
