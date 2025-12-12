# Backend API

API RESTful para el e-commerce Berrio.

## Ejecutar en desarrollo

```bash
# Desde la raíz del proyecto
pnpm install

# Iniciar Docker (PostgreSQL, Redis)
docker-compose -f docker-compose.dev.yml up -d

# Generar Prisma Client
pnpm db:generate

# Aplicar migraciones
pnpm db:migrate:dev

# Seed de datos
pnpm db:seed

# Iniciar API
cd apps/api
pnpm dev
```

La API estará disponible en `http://localhost:4000`

## Endpoints Principales

Ver documentación completa en `/docs/api/README.md`

### Autenticación

- POST `/api/v1/auth/register` - Registro
- POST `/api/v1/auth/login` - Login
- POST `/api/v1/auth/refresh` - Refresh token

### Productos

- GET `/api/v1/products` - Listar productos (con filtros)
- GET `/api/v1/products/:id` - Obtener producto
- GET `/api/v1/products/featured` - Productos destacados
- GET `/api/v1/products/search?q=` - Buscar productos

### Carrito

- GET `/api/v1/cart` - Ver carrito
- POST `/api/v1/cart/items` - Agregar item
- PUT `/api/v1/cart/items/:id` - Actualizar cantidad
- DELETE `/api/v1/cart/items/:id` - Eliminar item

### Órdenes

- GET `/api/v1/orders` - Mis órdenes
- GET `/api/v1/orders/:id` - Detalle de orden
- POST `/api/v1/orders` - Crear orden
- POST `/api/v1/orders/:id/cancel` - Cancelar orden

## Variables de Entorno

Ver `.env.example` en la raíz del proyecto.

Mínimas requeridas:

```
DATABASE_URL=postgresql://berrio:password@localhost:5432/berrio_ecommerce
JWT_SECRET=tu_secret_muy_seguro_aqui
API_PORT=4000
```
