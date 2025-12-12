# 📦 @berrio/database

Paquete compartido que contiene el esquema de Prisma, migraciones y cliente de base de datos.

## Uso

```typescript
import { prisma } from '@berrio/database';

// Ejemplo: Obtener productos
const products = await prisma.product.findMany({
  where: { isActive: true },
  include: {
    category: true,
    brand: true,
    images: true,
  },
});
```

## Scripts

```bash
# Generar Prisma Client
pnpm generate

# Ejecutar migraciones (desarrollo)
pnpm migrate:dev

# Ejecutar migraciones (producción)
pnpm migrate

# Abrir Prisma Studio
pnpm studio

# Seed de datos
pnpm seed

# Push schema sin migrations
pnpm db:push

# Formatear schema
pnpm format
```

## Estructura

```
packages/database/
├── prisma/
│   ├── schema.prisma    # Esquema de base de datos
│   ├── seed.ts          # Seed de datos
│   └── migrations/      # Migraciones
├── src/
│   └── index.ts         # Exports del paquete
└── package.json
```

## Migraciones

### Crear una nueva migración

```bash
pnpm migrate:dev --name add_user_avatar
```

### Aplicar migraciones en producción

```bash
pnpm migrate
```

### Resetear base de datos (⚠️ DESTRUCTIVO)

```bash
pnpm migrate:reset
```

## Prisma Client

El cliente de Prisma se genera automáticamente basado en el schema.

```typescript
// Auto-complete y type-safety completos
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    password: 'hashedPassword',
    firstName: 'John',
    lastName: 'Doe',
  },
});
```

## Relaciones

El schema incluye todas las relaciones necesarias:

```typescript
// Incluir relaciones
const product = await prisma.product.findUnique({
  where: { id: 'uuid' },
  include: {
    category: true,
    brand: true,
    images: true,
    reviews: {
      where: { status: 'APPROVED' },
      include: { user: true },
    },
  },
});
```

## Transacciones

```typescript
// Transacción para crear orden
const order = await prisma.$transaction(async (tx) => {
  // 1. Crear orden
  const newOrder = await tx.order.create({
    data: orderData,
  });

  // 2. Crear items
  await tx.orderItem.createMany({
    data: orderItems,
  });

  // 3. Reducir stock
  for (const item of orderItems) {
    await tx.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  return newOrder;
});
```

## Full-Text Search

```typescript
// Búsqueda de productos
const products = await prisma.$queryRaw`
  SELECT * FROM "Product"
  WHERE to_tsvector('spanish', name || ' ' || COALESCE(description, ''))
  @@ plainto_tsquery('spanish', ${searchQuery})
  AND "isActive" = true
  ORDER BY ts_rank(
    to_tsvector('spanish', name || ' ' || COALESCE(description, '')),
    plainto_tsquery('spanish', ${searchQuery})
  ) DESC
  LIMIT 20
`;
```

## Ver también

- [Database Documentation](../../docs/database/README.md)
- [Prisma Documentation](https://www.prisma.io/docs)
