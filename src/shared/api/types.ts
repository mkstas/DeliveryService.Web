export type PagedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type Permission = {
  id: string;
  displayName: string;
};

export type Role = {
  id: string;
  name: string;
  isBuiltIn: boolean;
  permissions: Permission[];
};

export type UserRole = {
  id: string;
  name: string;
};

export type Payment = {
  id: string;
  cardNumber: string;
};

export type User = {
  id: string;
  emailAddress: string;
  name: string;
  imageUrl: string | null;
  restaurantId: string | null;
  roles: UserRole[];
  payments: Payment[];
};

export type RestaurantAddress = {
  id: string;
  address: string;
};

export type RestaurantUser = {
  id: string;
  emailAddress: string;
  name: string;
  imageUrl: string | null;
};

export type Ingredient = {
  id: string;
  restaurantId: string;
  name: string;
};

export type Restaurant = {
  id: string;
  name: string;
  imageUrl: string | null;
  addresses: RestaurantAddress[];
  users: RestaurantUser[];
  ingredients: Ingredient[];
};

export type Category = {
  id: string;
  name: string;
};

export type Specification = {
  id: string;
  name: string;
};

export type DishSpecification = {
  id: string;
  dishId: string;
  specificationId: string;
  value: string;
};

export type DishIngredient = {
  id: string;
  ingredientId: string;
  name: string;
};

export type Dish = {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  specifications: DishSpecification[];
  ingredients: DishIngredient[];
};

export type CartItem = {
  id: string;
  dishId: string;
  quantity: number;
};

export type OrderDish = {
  dishId: string;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  status: string;
  address: string;
  cost: number;
  details: OrderDish[] | null;
  comment: string | null;
};
