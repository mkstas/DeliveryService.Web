export type UpdateMyRestaurantData = {
  name: string;
  imageUrl: string | null;
};

export type CreateMyDishData = {
  categoryId: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
};

export type CreateMyDishSpecificationData = {
  dishId: string;
  specificationId: string;
  value: string;
};

export type UpdateMyDishSpecificationData = {
  value: string;
};
