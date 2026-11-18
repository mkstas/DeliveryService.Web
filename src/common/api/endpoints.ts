export const apiEndpoints = {
  auth: {
    register: 'auth/register',
    login: 'auth/login',
    logout: 'auth/logout',
    confirmEmail: 'auth/email/confirm',
    resendConfirmation: 'auth/email/resend',
  },
  users: {
    all: 'users',
    me: 'users/me',
    roles: 'users/roles',
    role: (userId: string, roleId: string) => `users/${userId}/roles/${roleId}`,
    payments: 'users/payments',
    payment: (paymentId: string) => `users/payments/${paymentId}`,
  },
  roles: {
    all: 'roles',
    byId: (roleId: string) => `roles/${roleId}`,
    permissions: 'roles/permissions',
    permission: (roleId: string, permissionId: string) => `roles/${roleId}/permissions/${permissionId}`,
  },
  permissions: 'permissions',
  restaurants: {
    all: 'restaurants',
    byId: (restaurantId: string) => `restaurants/${restaurantId}`,
    users: 'restaurants/users',
    user: (restaurantId: string, userId: string) => `restaurants/${restaurantId}/users/${userId}`,
    addresses: 'restaurants/addresses',
    address: (restaurantId: string, addressId: string) => `restaurants/${restaurantId}/addresses/${addressId}`,
    ingredients: 'restaurants/ingredients',
    ingredient: (restaurantId: string, ingredientId: string) =>
      `restaurants/${restaurantId}/ingredients/${ingredientId}`,
  },
  categories: {
    all: 'categories',
    byId: (categoryId: string) => `categories/${categoryId}`,
  },
  specifications: {
    all: 'specifications',
    byId: (specificationId: string) => `specifications/${specificationId}`,
  },
  dishes: {
    all: 'dishes',
    byId: (dishId: string) => `dishes/${dishId}`,
  },
  dishSpecifications: {
    all: 'dishspecifications',
    byId: (dishSpecificationId: string) => `dishspecifications/${dishSpecificationId}`,
  },
  cartItems: {
    all: 'cartitems',
    byId: (cartItemId: string) => `cartitems/${cartItemId}`,
  },
  orders: {
    all: 'orders',
    byId: (orderId: string) => `orders/${orderId}`,
    status: (orderId: string) => `orders/${orderId}/status`,
  },
  static: {
    users: 'static/users',
    userImage: (imageName: string) => `static/users/${encodeURIComponent(imageName)}`,
    restaurantImage: (restaurantId: string) => `static/restaurants/${restaurantId}/image`,
    dishImage: (dishId: string) => `static/dishes/${dishId}/image`,
  },
} as const;
