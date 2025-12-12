import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
if (typeof window !== 'undefined') {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

// Products
export const getProducts = async (params?: any) => {
  const { data } = await api.get('/products', { params });
  return data.data;
};

export const getFeaturedProducts = async () => {
  const { data } = await api.get('/products/featured');
  return data.data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data.data;
};

export const searchProducts = async (q: string) => {
  const { data } = await api.get('/products/search', { params: { q } });
  return data.data;
};

// Categories
export const getCategories = async () => {
  const { data } = await api.get('/categories');
  return data.data;
};

// Brands
export const getBrands = async () => {
  const { data } = await api.get('/brands');
  return data.data;
};

// Auth
export const register = async (userData: any) => {
  const { data } = await api.post('/auth/register', userData);
  return data.data;
};

export const login = async (credentials: any) => {
  const { data } = await api.post('/auth/login', credentials);
  return data.data;
};

// Cart
export const getCart = async () => {
  const { data } = await api.get('/cart');
  return data.data;
};

export const addToCart = async (productId: string, quantity: number = 1) => {
  const { data } = await api.post('/cart/items', { productId, quantity });
  return data.data;
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  const { data } = await api.put(`/cart/items/${itemId}`, { quantity });
  return data.data;
};

export const removeFromCart = async (itemId: string) => {
  const { data } = await api.delete(`/cart/items/${itemId}`);
  return data.data;
};

// Orders
export const getOrders = async () => {
  const { data } = await api.get('/orders');
  return data.data;
};

export const createOrder = async (orderData: any) => {
  const { data } = await api.post('/orders', orderData);
  return data.data;
};
