import axios from 'axios';
import type {
  Product,
  ProductFilters,
  ProductsResponse,
  Category,
  Brand,
  Offer,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  CartItem,
  ApiResponse,
  User,
  Order,
  CreateOrderData,
} from '@/types';

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
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle auth errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
}

// ==================== PRODUCTS ====================
export const getProducts = async (
  filters?: ProductFilters
): Promise<ProductsResponse> => {
  const { data } = await api.get<ApiResponse<ProductsResponse>>('/products', {
    params: filters,
  });
  return data.data!;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<ApiResponse<Product[]>>('/products/featured');
  return data.data!;
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
  return data.data!;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const { data } = await api.get<ApiResponse<Product[]>>('/products/search', {
    params: { q: query },
  });
  return data.data!;
};

export const getRelatedProducts = async (
  productId: string
): Promise<Product[]> => {
  const { data } = await api.get<ApiResponse<Product[]>>(
    `/products/${productId}/related`
  );
  return data.data!;
};

// ==================== CATEGORIES ====================
export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<ApiResponse<Category[]>>('/categories');
  return data.data!;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const { data } = await api.get<ApiResponse<Category>>(`/categories/${id}`);
  return data.data!;
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const { data } = await api.get<ApiResponse<Category>>(
    `/categories/slug/${slug}`
  );
  return data.data!;
};

// ==================== BRANDS ====================
export const getBrands = async (): Promise<Brand[]> => {
  const { data } = await api.get<ApiResponse<Brand[]>>('/brands');
  return data.data!;
};

export const getBrandById = async (id: string): Promise<Brand> => {
  const { data } = await api.get<ApiResponse<Brand>>(`/brands/${id}`);
  return data.data!;
};

export const getBrandBySlug = async (slug: string): Promise<Brand> => {
  const { data } = await api.get<ApiResponse<Brand>>(`/brands/slug/${slug}`);
  return data.data!;
};

// ==================== OFFERS ====================
export const getOffers = async (): Promise<Offer[]> => {
  const { data } = await api.get<ApiResponse<Offer[]>>('/offers');
  return data.data!;
};

export const getActiveOffers = async (): Promise<Offer[]> => {
  const { data } = await api.get<ApiResponse<Offer[]>>('/offers/active');
  return data.data!;
};

export const getOfferById = async (id: string): Promise<Offer> => {
  const { data } = await api.get<ApiResponse<Offer>>(`/offers/${id}`);
  return data.data!;
};

// ==================== AUTH ====================
export const register = async (
  userData: RegisterData
): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    '/auth/register',
    userData
  );
  return data.data!;
};

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    '/auth/login',
    credentials
  );
  return data.data!;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getProfile = async (): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>('/auth/profile');
  return data.data!;
};

export const updateProfile = async (
  profileData: Partial<User>
): Promise<User> => {
  const { data } = await api.put<ApiResponse<User>>(
    '/auth/profile',
    profileData
  );
  return data.data!;
};

// ==================== CART (Client-side for now) ====================
// These functions will work with Zustand store instead of API initially
export const getCart = async (): Promise<CartItem[]> => {
  // Will be implemented when backend is ready
  return [];
};

export const addToCart = async (
  _productId: string,
  _quantity: number = 1
): Promise<void> => {
  // Will be implemented when backend is ready
  return;
};

export const updateCartItem = async (
  _itemId: string,
  _quantity: number
): Promise<void> => {
  // Will be implemented when backend is ready
  return;
};

export const removeFromCart = async (_itemId: string): Promise<void> => {
  // Will be implemented when backend is ready
  return;
};

// ==================== FAVORITES ====================
export const getFavorites = async (): Promise<string[]> => {
  const { data } = await api.get<ApiResponse<string[]>>('/favorites');
  return data.data!;
};

export const addToFavorites = async (productId: string): Promise<void> => {
  await api.post('/favorites', { productId });
};

export const removeFromFavorites = async (productId: string): Promise<void> => {
  await api.delete(`/favorites/${productId}`);
};

// ==================== ORDERS ====================
export const getOrders = async (): Promise<Order[]> => {
  const { data } = await api.get<ApiResponse<Order[]>>('/orders');
  return data.data!;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const { data } = await api.get<ApiResponse<Order>>(`/orders/${id}`);
  return data.data!;
};

export const createOrder = async (
  orderData: CreateOrderData
): Promise<Order> => {
  const { data } = await api.post<ApiResponse<Order>>('/orders', orderData);
  return data.data!;
};
