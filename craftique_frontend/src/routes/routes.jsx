// src/routes/routes.js

const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/ForgotPassword",
  FORGOT_PASSWORD_SECURITY: "/forgot-password-security",
  ROLE_REDIRECT: "/role-redirect",
  HOME: "/",
  ABOUT: "/about", 
  CONTACT: "/contact",

  BUYER: {
    DASHBOARD: "/buyer/dashboard",
    PRODUCTS: "/buyer/products",
    WISHLIST: "/buyer/wishlist",
    CART: "/buyer/cart",
    ORDERS: "/buyer/orders",
    PROFILE: "/buyer/profile",
  },

  ARTISAN: {
    DASHBOARD: "/artisan/dashboard",
    PROFILE: "/artisan/profile",
    ADD_PRODUCT: "/artisan/products/add",
    LISTING_GUIDELINES: "/artisan/listing-guidelines",
    PRODUCTS: "/artisan/products",
    ORDERS: "/artisan/orders",
    PAYMENTS: "/artisan/payments",
    ANALYTICS: "/artisan/analytics",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
  },
};

export default ROUTES;
