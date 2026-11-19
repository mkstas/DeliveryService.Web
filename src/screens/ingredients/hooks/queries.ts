import { apiEndpoints, httpOptional, type Ingredient, type Restaurant } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

export type IngredientWithRestaurant = Ingredient & {
  restaurantName: string;
};

export const useIngredients = (search?: string) => {
  const pattern = (search ?? '').trim().toLowerCase();

  return useQuery({
    queryKey: ['ingredients', pattern],
    queryFn: () => httpOptional<Restaurant[]>(apiEndpoints.restaurants.all),
    select: restaurants =>
      (restaurants ?? [])
        .flatMap(restaurant =>
          restaurant.ingredients.map(ingredient => ({ ...ingredient, restaurantName: restaurant.name })),
        )
        .filter(ingredient => pattern.length === 0 || ingredient.name.toLowerCase().includes(pattern)),
  });
};
