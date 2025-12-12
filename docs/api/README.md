# 📚 API Documentation - Berrio E-commerce

## Base URL

```
Development: http://localhost:4000/api/v1
Production: https://api.berrioecommerce.com/api/v1
```

## Authentication

La API utiliza JWT (JSON Web Tokens) para autenticación.

### Obtener Token

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 604800
  }
}
```

### Usar Token

Incluye el token en el header `Authorization`:

```http
Authorization: Bearer {your-access-token}
```

---

## Endpoints

### 🔐 Authentication

#### Register User

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Refresh Token

```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer {token}
```

#### Forgot Password

```http
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password

```http
POST /api/v1/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "password": "NewSecurePass123!"
}
```

---

### 👤 Users

#### Get Current User

```http
GET /api/v1/users/me
Authorization: Bearer {token}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "avatar": "https://...",
    "role": "CUSTOMER",
    "emailVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Profile

```http
PATCH /api/v1/users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Change Password

```http
POST /api/v1/users/me/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass123!"
}
```

---

### 📦 Products

#### List Products

```http
GET /api/v1/products?page=1&limit=20&categoryId=uuid&brandId=uuid&minPrice=0&maxPrice=5000&search=laptop&sort=price_asc
```

**Query Parameters:**

- `page` (number): Página actual (default: 1)
- `limit` (number): Items por página (default: 20, max: 100)
- `categoryId` (uuid): Filtrar por categoría
- `brandId` (uuid): Filtrar por marca
- `minPrice` (number): Precio mínimo
- `maxPrice` (number): Precio máximo
- `search` (string): Búsqueda de texto
- `sort` (string): Ordenamiento
  - `price_asc`: Precio ascendente
  - `price_desc`: Precio descendente
  - `newest`: Más recientes
  - `popular`: Más populares
  - `rating`: Mejor calificados

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "sku": "SKU-12345",
        "name": "MacBook Pro 14\"",
        "slug": "macbook-pro-14",
        "description": "Powerful laptop...",
        "shortDescription": "M3 chip, 16GB RAM",
        "price": 1999.99,
        "compareAtPrice": 2299.99,
        "stock": 15,
        "averageRating": 4.8,
        "reviewCount": 127,
        "category": {
          "id": "uuid",
          "name": "Laptops",
          "slug": "laptops"
        },
        "brand": {
          "id": "uuid",
          "name": "Apple",
          "logo": "https://..."
        },
        "images": [
          {
            "url": "https://...",
            "alt": "MacBook Pro",
            "isPrimary": true
          }
        ],
        "specifications": {
          "processor": "Apple M3",
          "ram": "16GB",
          "storage": "512GB SSD"
        },
        "isFeatured": true,
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    },
    "filters": {
      "categories": [...],
      "brands": [...],
      "priceRange": {
        "min": 99.99,
        "max": 4999.99
      }
    }
  }
}
```

#### Get Product by ID

```http
GET /api/v1/products/:id
```

#### Get Product by Slug

```http
GET /api/v1/products/slug/:slug
```

#### Get Featured Products

```http
GET /api/v1/products/featured?limit=10
```

#### Search Products

```http
GET /api/v1/products/search?q=macbook&limit=10
```

**Response:**

```json
{
  "success": true,
  "data": {
    "results": [...],
    "suggestions": [
      "macbook pro",
      "macbook air",
      "macbook 14"
    ]
  }
}
```

---

### 📂 Categories

#### List Categories

```http
GET /api/v1/categories
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Computadoras y Laptops",
      "slug": "computadoras-laptops",
      "description": "Laptops, PCs...",
      "icon": "💻",
      "productCount": 245,
      "children": [
        {
          "id": "uuid",
          "name": "Laptops Gaming",
          "slug": "laptops-gaming",
          "productCount": 87
        }
      ]
    }
  ]
}
```

#### Get Category by ID

```http
GET /api/v1/categories/:id
```

#### Get Category Products

```http
GET /api/v1/categories/:id/products?page=1&limit=20
```

---

### 🏢 Brands

#### List Brands

```http
GET /api/v1/brands
```

#### Get Brand by ID

```http
GET /api/v1/brands/:id
```

#### Get Brand Products

```http
GET /api/v1/brands/:id/products?page=1&limit=20
```

---

### 🛒 Cart

#### Get Cart

```http
GET /api/v1/cart
Authorization: Bearer {token}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "product": {
          "id": "uuid",
          "name": "MacBook Pro",
          "price": 1999.99,
          "image": "https://...",
          "stock": 15
        },
        "quantity": 2,
        "subtotal": 3999.98
      }
    ],
    "summary": {
      "itemCount": 2,
      "subtotal": 3999.98,
      "tax": 319.99,
      "shipping": 0,
      "total": 4319.97
    }
  }
}
```

#### Add Item to Cart

```http
POST /api/v1/cart/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "uuid",
  "quantity": 1
}
```

#### Update Cart Item

```http
PATCH /api/v1/cart/items/:itemId
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove Cart Item

```http
DELETE /api/v1/cart/items/:itemId
Authorization: Bearer {token}
```

#### Clear Cart

```http
DELETE /api/v1/cart
Authorization: Bearer {token}
```

---

### 💝 Wishlist

#### Get Wishlist

```http
GET /api/v1/wishlist
Authorization: Bearer {token}
```

#### Add to Wishlist

```http
POST /api/v1/wishlist
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "uuid"
}
```

#### Remove from Wishlist

```http
DELETE /api/v1/wishlist/:itemId
Authorization: Bearer {token}
```

---

### 📍 Addresses

#### List Addresses

```http
GET /api/v1/addresses
Authorization: Bearer {token}
```

#### Create Address

```http
POST /api/v1/addresses
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "company": "Acme Inc",
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 4B",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "US",
  "phone": "+1234567890",
  "isDefault": true
}
```

#### Update Address

```http
PATCH /api/v1/addresses/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "addressLine1": "456 Oak Ave",
  "isDefault": false
}
```

#### Delete Address

```http
DELETE /api/v1/addresses/:id
Authorization: Bearer {token}
```

---

### 🛍️ Orders

#### List Orders

```http
GET /api/v1/orders?page=1&limit=20&status=DELIVERED
Authorization: Bearer {token}
```

**Query Parameters:**

- `status`: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED

**Response:**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "uuid",
        "orderNumber": "ORD-20240101-12345",
        "status": "DELIVERED",
        "paymentStatus": "PAID",
        "total": 2199.99,
        "currency": "USD",
        "itemCount": 2,
        "shippingAddress": {
          "firstName": "John",
          "lastName": "Doe",
          "addressLine1": "123 Main St",
          "city": "New York",
          "state": "NY",
          "zipCode": "10001"
        },
        "trackingNumber": "1Z999AA10123456784",
        "trackingUrl": "https://...",
        "deliveredAt": "2024-01-10T00:00:00.000Z",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  }
}
```

#### Get Order by ID

```http
GET /api/v1/orders/:id
Authorization: Bearer {token}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "ORD-20240101-12345",
    "status": "DELIVERED",
    "paymentStatus": "PAID",
    "items": [
      {
        "id": "uuid",
        "productName": "MacBook Pro 14\"",
        "productSku": "SKU-12345",
        "productImage": "https://...",
        "quantity": 1,
        "price": 1999.99,
        "discount": 0,
        "subtotal": 1999.99
      }
    ],
    "subtotal": 1999.99,
    "tax": 159.99,
    "shipping": 15.99,
    "discount": 0,
    "total": 2175.97,
    "currency": "USD",
    "shippingAddress": {...},
    "payment": {
      "provider": "STRIPE",
      "last4": "4242",
      "cardBrand": "Visa",
      "paidAt": "2024-01-01T00:15:00.000Z"
    },
    "notes": "Please deliver before 5 PM",
    "trackingNumber": "1Z999AA10123456784",
    "trackingUrl": "https://...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-10T00:00:00.000Z"
  }
}
```

#### Create Order (Checkout)

```http
POST /api/v1/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "addressId": "uuid",
  "paymentMethodId": "pm_card_visa",
  "notes": "Please deliver before 5 PM"
}
```

#### Cancel Order

```http
POST /api/v1/orders/:id/cancel
Authorization: Bearer {token}
```

---

### 💳 Payments

#### Create Payment Intent (Stripe)

```http
POST /api/v1/payments/create-intent
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 2199.99,
  "currency": "USD"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "publishableKey": "pk_test_xxx"
  }
}
```

#### Confirm Payment

```http
POST /api/v1/payments/confirm
Authorization: Bearer {token}
Content-Type: application/json

{
  "paymentIntentId": "pi_xxx",
  "orderId": "uuid"
}
```

#### Get Payment by Order

```http
GET /api/v1/payments/order/:orderId
Authorization: Bearer {token}
```

---

### ⭐ Reviews

#### List Product Reviews

```http
GET /api/v1/products/:productId/reviews?page=1&limit=20&sort=newest
```

**Query Parameters:**

- `sort`: newest, oldest, highest, lowest, helpful

**Response:**

```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "uuid",
        "user": {
          "firstName": "John",
          "lastName": "D.",
          "avatar": "https://..."
        },
        "rating": 5,
        "title": "Excellent product!",
        "comment": "This is the best laptop I've ever owned...",
        "isVerifiedPurchase": true,
        "helpfulCount": 42,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "summary": {
      "averageRating": 4.8,
      "totalReviews": 127,
      "ratingDistribution": {
        "5": 95,
        "4": 20,
        "3": 8,
        "2": 3,
        "1": 1
      }
    },
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 127,
      "totalPages": 7
    }
  }
}
```

#### Create Review

```http
POST /api/v1/products/:productId/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "title": "Excellent product!",
  "comment": "This is the best laptop I've ever owned..."
}
```

#### Mark Review as Helpful

```http
POST /api/v1/reviews/:reviewId/helpful
Authorization: Bearer {token}
```

#### Update Review

```http
PATCH /api/v1/reviews/:reviewId
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "title": "Updated title",
  "comment": "Updated comment"
}
```

#### Delete Review

```http
DELETE /api/v1/reviews/:reviewId
Authorization: Bearer {token}
```

---

## Error Handling

La API utiliza códigos de estado HTTP estándar y retorna errores en formato JSON consistente:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Códigos de Error Comunes

| Código HTTP | Código Error          | Descripción                     |
| ----------- | --------------------- | ------------------------------- |
| 400         | VALIDATION_ERROR      | Datos de entrada inválidos      |
| 401         | UNAUTHORIZED          | No autenticado                  |
| 403         | FORBIDDEN             | Sin permisos                    |
| 404         | NOT_FOUND             | Recurso no encontrado           |
| 409         | CONFLICT              | Conflicto (ej: email duplicado) |
| 422         | UNPROCESSABLE_ENTITY  | Lógica de negocio no válida     |
| 429         | RATE_LIMIT_EXCEEDED   | Límite de requests excedido     |
| 500         | INTERNAL_SERVER_ERROR | Error del servidor              |

---

## Rate Limiting

La API implementa rate limiting para prevenir abuso:

- **Anónimo**: 100 requests / 15 minutos
- **Autenticado**: 500 requests / 15 minutos
- **Admin**: 1000 requests / 15 minutos

Headers de respuesta:

```
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 487
X-RateLimit-Reset: 1640995200
```

---

## Webhooks

### Stripe Webhooks

Endpoint para recibir eventos de Stripe:

```http
POST /api/v1/webhooks/stripe
```

Eventos manejados:

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

---

## Pagination

Todas las listas usan paginación consistente:

**Request:**

```http
GET /api/v1/products?page=2&limit=20
```

**Response:**

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 2,
      "limit": 20,
      "total": 156,
      "totalPages": 8,
      "hasNext": true,
      "hasPrev": true
    }
  }
}
```

---

## Filtering & Sorting

### Filtros Comunes

```http
GET /api/v1/products?categoryId=uuid&brandId=uuid&minPrice=100&maxPrice=5000&inStock=true
```

### Ordenamiento

```http
GET /api/v1/products?sort=price_asc
GET /api/v1/products?sort=price_desc
GET /api/v1/products?sort=newest
GET /api/v1/products?sort=rating
```

---

## Testing

### Postman Collection

Importa la colección de Postman: [berrio-ecommerce.postman_collection.json](./postman/berrio-ecommerce.postman_collection.json)

### Test Credentials

**Admin:**

- Email: `admin@berrioecommerce.com`
- Password: `password123`

**Customer:**

- Email: `customer@example.com`
- Password: `password123`

### Test Cards (Stripe)

- Success: `4242 4242 4242 4242`
- Requires Auth: `4000 0025 0000 3155`
- Declined: `4000 0000 0000 9995`

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get products
const { data } = await api.get('/products', {
  params: {
    page: 1,
    limit: 20,
    categoryId: 'uuid',
  },
});

// Create order
const order = await api.post('/orders', {
  addressId: 'uuid',
  paymentMethodId: 'pm_xxx',
});
```

---

## Changelog

### v1.0.0 (2024-01-01)

- Initial API release
- Complete e-commerce functionality
- Stripe integration
- PayPal integration

---

## Support

- **Email**: api-support@berrioecommerce.com
- **Discord**: https://discord.gg/berrio-ecommerce
- **GitHub Issues**: https://github.com/Emmanuelxs13/berrio_ecommerce/issues
