/**
 * Application Constants
 */

// API Configuration
export const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api';
export const API_TIMEOUT = 30000;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  CUSTOMER: 'customer',
  GUEST: 'guest',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  NET_BANKING: 'net_banking',
  UPI: 'upi',
  WALLET: 'wallet',
  COD: 'cod',
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 1, name: 'Electronics', icon: '📱' },
  { id: 2, name: 'Clothing', icon: '👕' },
  { id: 3, name: 'Books', icon: '📚' },
  { id: 4, name: 'Home & Kitchen', icon: '🏠' },
  { id: 5, name: 'Sports', icon: '⚽' },
  { id: 6, name: 'Toys', icon: '🧸' },
  { id: 7, name: 'Beauty', icon: '💄' },
  { id: 8, name: 'Automotive', icon: '🚗' },
];

// Price Ranges
export const PRICE_RANGES = [
  { id: 1, label: 'Under ₹1,000', min: 0, max: 1000 },
  { id: 2, label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
  { id: 3, label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { id: 4, label: '₹10,000 - ₹50,000', min: 10000, max: 50000 },
  { id: 5, label: 'Above ₹50,000', min: 50000, max: 1000000 },
];

// Rating Filters
export const RATING_FILTERS = [
  { id: 5, label: '⭐⭐⭐⭐⭐ 5 Star', value: 5 },
  { id: 4, label: '⭐⭐⭐⭐ 4 Star & up', value: 4 },
  { id: 3, label: '⭐⭐⭐ 3 Star & up', value: 3 },
  { id: 2, label: '⭐⭐ 2 Star & up', value: 2 },
  { id: 1, label: '⭐ 1 Star & up', value: 1 },
];

// Sort Options
export const SORT_OPTIONS = [
  { id: 'relevant', label: 'Most Relevant' },
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'discount', label: 'Highest Discount' },
];

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful!',
    REGISTER: 'Registration successful!',
    ADD_CART: 'Item added to cart!',
    REMOVE_CART: 'Item removed from cart!',
    UPDATE_CART: 'Cart updated!',
    ADD_WISHLIST: 'Added to wishlist!',
    REMOVE_WISHLIST: 'Removed from wishlist!',
    ORDER_PLACED: 'Order placed successfully!',
    PROFILE_UPDATE: 'Profile updated!',
  },
  ERROR: {
    UNAUTHORIZED: 'Please login to continue',
    FORBIDDEN: 'You do not have permission',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Server error. Please try again later',
    NETWORK_ERROR: 'Network error. Please check your connection',
    VALIDATION_ERROR: 'Please check the form for errors',
  },
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  PHONE_LENGTH: 10,
  PINCODE_LENGTH: 6,
  CARD_NUMBER_LENGTH: { min: 13, max: 19 },
  CVV_LENGTH: { min: 3, max: 4 },
};

// Search Debounce
export const DEBOUNCE_DELAY = 300;

// Animation Durations (in ms)
export const ANIMATION = {
  FAST: 200,
  NORMAL: 500,
  SLOW: 1000,
};

// Tax Rate
export const TAX_RATE = 0.18; // 18% GST

// Shipping Cost
export const SHIPPING_COST = 0; // Free shipping

// Discount Types
export const DISCOUNT_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  BOGO: 'bogo',
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'support@flipcart.com',
  PHONE: '+91 1234567890',
  ADDRESS: '123, Business Street, Mumbai, India 400001',
  WORKING_HOURS: '9:00 AM - 6:00 PM (Mon-Fri)',
};

// Social Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/flipcart',
  TWITTER: 'https://twitter.com/flipcart',
  INSTAGRAM: 'https://instagram.com/flipcart',
  LINKEDIN: 'https://linkedin.com/company/flipcart',
  YOUTUBE: 'https://youtube.com/flipcart',
};
