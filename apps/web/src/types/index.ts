// ============================================
// TIPOS CENTRALIZADOS - BERRIO E-COMMERCE
// ============================================

// ==================== PRODUCT ====================
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  stock: number;
  images: string[];
  categoryId: string;
  category?: Category;
  brandId?: string;
  brand?: Brand;
  featured: boolean;
  specifications?: Record<string, string>;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  sortBy?:
    | 'price_asc'
    | 'price_desc'
    | 'name_asc'
    | 'name_desc'
    | 'newest'
    | 'popular';
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

// ==================== CATEGORY ====================
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  parentId?: string | null;
  parent?: Category;
  children?: Category[];
  _count?: {
    products: number;
  };
  createdAt: string;
  updatedAt: string;
}

// ==================== BRAND ====================
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  _count?: {
    products: number;
  };
  createdAt: string;
  updatedAt: string;
}

// ==================== OFFER/DEAL ====================
export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  productIds: string[];
  products?: Product[];
  startDate: string;
  endDate: string;
  active: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== CART ====================
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discount?: number;
  quantity: number;
  image: string;
  stock: number;
  brand?: string;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

// ==================== FAVORITES ====================
export interface FavoriteItem {
  productId: string;
  addedAt: string;
}

// ==================== ORDERS ====================
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface CreateOrderData {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

// ==================== USER & AUTH ====================
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

// ==================== API RESPONSES ====================
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ==================== FORM STATES ====================
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ==================== UI STATES ====================
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
