import axios from 'axios';

// Create Axios instance with Laravel backend configuration
// Use Vite's import.meta.env for environment variables in the browser
const baseURL =
  import.meta?.env?.VITE_API_URL || import.meta?.env?.REACT_APP_API_URL || 'http://localhost:8000/api';

const API = axios.create({
  baseURL,
  withCredentials: true, // Enable Sanctum CSRF token handling
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors & token expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Product endpoints
export const productAPI = {
  getAll: (filters = {}) => API.get('/products', { params: filters }),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
  search: (query) => API.get('/products/search', { params: { q: query } }),
};

// Cart endpoints
export const cartAPI = {
  get: () => API.get('/cart'),
  add: (productId, quantity) => API.post('/cart', { product_id: productId, quantity }),
  update: (cartItemId, quantity) => API.put(`/cart/${cartItemId}`, { quantity }),
  remove: (cartItemId) => API.delete(`/cart/${cartItemId}`),
  clear: () => API.post('/cart/clear'),
};

// Order endpoints
export const orderAPI = {
  getAll: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`),
  create: (data) => API.post('/orders', data),
  cancel: (id) => API.post(`/orders/${id}/cancel`),
  getStatus: (id) => API.get(`/orders/${id}/status`),
};

// Auth endpoints (Sanctum)
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (email, password) => API.post('/auth/login', { email, password }),
  logout: () => API.post('/auth/logout'),
  me: () => API.get('/auth/me'),
  refreshToken: () => API.post('/auth/refresh'),
};

// Review endpoints
export const reviewAPI = {
  getByProduct: (productId) => API.get(`/products/${productId}/reviews`),
  create: (productId, data) => API.post(`/products/${productId}/reviews`, data),
  update: (reviewId, data) => API.put(`/reviews/${reviewId}`, data),
  delete: (reviewId) => API.delete(`/reviews/${reviewId}`),
};

// Wishlist endpoints
export const wishlistAPI = {
  get: () => API.get('/wishlist'),
  add: (productId) => API.post('/wishlist', { product_id: productId }),
  remove: (productId) => API.delete(`/wishlist/${productId}`),
};

// User endpoints
export const userAPI = {
  getProfile: () => API.get('/user/profile'),
  updateProfile: (data) => API.put('/user/profile', data),
  updatePassword: (data) => API.put('/user/password', data),
  getAddresses: () => API.get('/user/addresses'),
  addAddress: (data) => API.post('/user/addresses', data),
  updateAddress: (id, data) => API.put(`/user/addresses/${id}`, data),
  deleteAddress: (id) => API.delete(`/user/addresses/${id}`),
};

export default API;
