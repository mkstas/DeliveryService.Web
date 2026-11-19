export const PERMISSIONS = {
  rolesRead: 'roles.read',
  usersRead: 'users.read',
  usersUpdate: 'users.update',
  restaurantsRead: 'restaurants.read',
  restaurantsUpdate: 'restaurants.update',
  categoriesRead: 'categories.read',
  specificationsRead: 'specifications.read',
  dishesRead: 'dishes.read',
  dishesCreate: 'dishes.create',
  dishesUpdate: 'dishes.update',
  dishesDelete: 'dishes.delete',
  dishSpecificationsRead: 'dish-specifications.read',
  ordersRead: 'orders.read',
  ordersUpdateStatus: 'orders.update-status',
} as const;

export const ROLE_NAMES = {
  administrator: 'Администратор',
  manager: 'Менеджер',
  client: 'Клиент',
} as const;
