import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  addProduct: (productData) => api.post('/products', productData),
};

export const ratingService = {
  addRating: (productId, rating, review) => api.post('/ratings', { productId, rating, review }),
  getProductRatings: (productId) => api.get(`/ratings/product/${productId}`),
  getUserRating: (productId) => api.get(`/ratings/${productId}`),
};

export const favoriteService = {
  getAll: () => api.get('/favorites'),
  add: (productId) => api.post(`/favorites/add/${productId}`),
  remove: (productId) => api.delete(`/favorites/remove/${productId}`),
  check: (productId) => api.get(`/favorites/check/${productId}`),
};

export const recommendationService = {
  getRecommendations: () => api.get('/recommendations'),
};

export default api;
