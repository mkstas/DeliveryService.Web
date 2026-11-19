export type CreateRestaurantData = {
  name: string;
  imageUrl: string | null;
};

export type UpdateRestaurantData = {
  name: string;
  imageUrl: string | null;
};

export type UploadRestaurantImageData = {
  id: string;
  file: File;
};

export type AddRestaurantUserData = {
  restaurantId: string;
  emailAddress: string;
};

export type RemoveRestaurantUserData = {
  restaurantId: string;
  userId: string;
};

export type AddRestaurantAddressData = {
  restaurantId: string;
  address: string;
};

export type UpdateRestaurantAddressData = {
  address: string;
};

export type RemoveRestaurantAddressData = {
  restaurantId: string;
  addressId: string;
};

export type AddRestaurantIngredientData = {
  restaurantId: string;
  name: string;
};

export type UpdateRestaurantIngredientData = {
  name: string;
};

export type RemoveRestaurantIngredientData = {
  restaurantId: string;
  ingredientId: string;
};
