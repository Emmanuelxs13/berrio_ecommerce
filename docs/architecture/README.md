# 🏗️ Arquitectura del Sistema - Berrio E-commerce

## Índice

1. [Visión General](#visión-general)
2. [Arquitectura de Alto Nivel](#arquitectura-de-alto-nivel)
3. [Arquitectura de Microservicios](#arquitectura-de-microservicios)
4. [Flujo de Datos](#flujo-de-datos)
5. [Patrones de Diseño](#patrones-de-diseño)
6. [Escalabilidad](#escalabilidad)
7. [Seguridad](#seguridad)
8. [Monitoreo y Observabilidad](#monitoreo-y-observabilidad)

---

## Visión General

### Principios de Arquitectura

1. **Separación de Concerns**: Frontend, Backend y Base de Datos claramente separados
2. **Escalabilidad Horizontal**: Cada servicio puede escalar independientemente
3. **Stateless Services**: APIs sin estado para facilitar el escalado
4. **Cache-First Strategy**: Redis para reducir carga en la base de datos
5. **API-First Design**: Backend expone APIs RESTful bien documentadas
6. **Progressive Enhancement**: Funcionalidades básicas siempre disponibles
7. **Fault Tolerance**: Manejo de errores y fallback strategies
8. **Security by Design**: Seguridad implementada en todas las capas

---

## Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                 │
└──────────────────────┬──────────────────────────────────────────┘
                       │
              ┌────────▼────────┐
              │   CDN (Images)  │
              │   Cloudflare    │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │  Load Balancer  │
              │   Nginx/HAProxy │
              └────────┬────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
    ┌────▼────┐   ┌───▼────┐   ┌───▼────┐
    │  Web    │   │  API   │   │ Admin  │
    │ Next.js │   │Express │   │Next.js │
    │  :3000  │   │ :4000  │   │ :3001  │
    └────┬────┘   └───┬────┘   └───┬────┘
         │            │            │
         └────────────┼────────────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
    ┌────▼────┐  ┌───▼────┐  ┌───▼────┐
    │PostgreSQL│  │ Redis  │  │   S3   │
    │  :5432  │  │ :6379  │  │Storage │
    └─────────┘  └────────┘  └────────┘
```

---

## Arquitectura de Microservicios

### Frontend Layer

#### 1. Web App (Next.js 14)

**Responsabilidades**:

- Server-Side Rendering (SSR)
- Incremental Static Regeneration (ISR)
- Client-side routing
- State management
- SEO optimization

**Tecnologías**:

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- TanStack Query (Server State)

**Estructura**:

```
apps/web/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes group
│   ├── (shop)/            # Shop routes group
│   ├── product/           # Product pages
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout flow
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
├── lib/
│   ├── api/               # API client
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utilities
│   └── validation/        # Zod schemas
├── store/                 # Zustand stores
└── public/                # Static assets
```

#### 2. Admin Panel (Next.js 14)

**Responsabilidades**:

- Dashboard analytics
- Product management (CRUD)
- Order management
- User management
- Reports generation

**Características**:

- Role-based access control (RBAC)
- Real-time updates (WebSockets)
- Drag & drop interfaces
- Data visualization (Charts.js)
- Export/Import functionality

---

### Backend Layer

#### API Service (Express.js)

**Responsabilidades**:

- Business logic
- Data validation
- Authentication & Authorization
- Payment processing
- Email notifications
- File uploads

**Arquitectura en Capas**:

```
apps/api/
├── src/
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── repositories/      # Data access layer
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── validators/        # Request validation
│   ├── utils/             # Utilities
│   └── config/            # Configuration
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── prisma/                # Prisma client instance
```

**Capas**:

1. **Controller Layer**

```typescript
// Maneja requests HTTP
// Valida entrada
// Llama a services
// Retorna responses
```

2. **Service Layer**

```typescript
// Lógica de negocio
// Orquestación de operaciones
// Validaciones complejas
// Transacciones
```

3. **Repository Layer**

```typescript
// Acceso a datos (Prisma)
// Queries optimizadas
// Caché management
```

---

### Data Layer

#### PostgreSQL 16

**Uso**:

- Primary data store
- Transactional data
- Full-text search

**Optimizaciones**:

- Connection pooling (PgBouncer)
- Read replicas
- Índices estratégicos
- Partitioning por fecha (orders)

#### Redis 7

**Uso**:

- Session storage
- Cache layer
- Rate limiting
- Job queues
- Real-time features

**Estrategia de Cache**:

```
Cache-Aside Pattern:
1. Check cache
2. If miss, query DB
3. Store in cache
4. Return data

TTL Strategy:
- Products: 1 hour
- Categories: 6 hours
- User cart: 24 hours
- Session: 7 days
```

---

## Flujo de Datos

### 1. Navegación de Productos

```
┌──────┐     ┌─────┐     ┌──────┐     ┌──────┐     ┌────┐
│Client│────▶│Next │────▶│ API  │────▶│Redis │     │ DB │
└──────┘     │ SSR │     └──────┘     └──────┘     └────┘
             └─────┘         │             │          │
                             │         Cache Miss     │
                             │             │          │
                             └─────────────┴─────────▶│
                                         Query        │
                             ┌─────────────┬──────────┘
                             │          Store
                             │             │
                          Response     ┌───▼──┐
                             │         │Redis │
                             │         └──────┘
                             ▼
```

### 2. Proceso de Checkout

```
User                Web App           API              Payment Gateway    Database
 │                    │                │                      │              │
 │──Add to Cart──────▶│                │                      │              │
 │                    │──Cart Update──▶│──Save to Redis──────▶              │
 │                    │                │                      │              │
 │──Proceed Checkout─▶│                │                      │              │
 │                    │──Validate Cart▶│──Check Stock────────────────────▶  │
 │                    │                │◀─────Stock OK───────────────────── │
 │                    │                │                      │              │
 │──Enter Payment────▶│                │                      │              │
 │                    │──Process Pay──▶│──Create Intent──────▶              │
 │                    │                │◀─────Client Secret─────            │
 │                    │◀─Return Secret─│                      │              │
 │                    │                │                      │              │
 │──Confirm Payment──▶│──Confirm──────▶│──Confirm Payment────▶              │
 │                    │                │◀─────Success────────────            │
 │                    │                │                      │              │
 │                    │                │──Create Order───────────────────▶  │
 │                    │                │──Update Stock───────────────────▶  │
 │                    │                │──Clear Cart─────────▶              │
 │                    │                │──Send Email───────▶                │
 │                    │                │                      │              │
 │◀──Order Confirmed──│◀──Success─────│                      │              │
```

### 3. Búsqueda de Productos

```
1. User types query
2. Debounced request to API
3. API checks Redis cache (search:{query})
4. If cache miss:
   - PostgreSQL Full-Text Search
   - Store results in cache (TTL: 15min)
5. Return results with facets
6. Client renders with instant feedback
```

---

## Patrones de Diseño

### Backend Patterns

1. **Repository Pattern**

```typescript
// Abstracción de acceso a datos
interface IProductRepository {
  findById(id: string): Promise<Product>;
  findAll(filters: ProductFilters): Promise<Product[]>;
  create(data: CreateProductDto): Promise<Product>;
  update(id: string, data: UpdateProductDto): Promise<Product>;
  delete(id: string): Promise<void>;
}
```

2. **Service Layer Pattern**

```typescript
// Lógica de negocio encapsulada
class ProductService {
  constructor(
    private productRepo: IProductRepository,
    private cacheService: ICacheService
  ) {}

  async getProduct(id: string): Promise<Product> {
    // Check cache
    const cached = await this.cacheService.get(`product:${id}`);
    if (cached) return cached;

    // Query database
    const product = await this.productRepo.findById(id);

    // Store in cache
    await this.cacheService.set(`product:${id}`, product, 3600);

    return product;
  }
}
```

3. **Factory Pattern**

```typescript
// Para crear diferentes tipos de pagos
class PaymentFactory {
  static create(provider: PaymentProvider): IPaymentProcessor {
    switch (provider) {
      case 'STRIPE':
        return new StripeProcessor();
      case 'PAYPAL':
        return new PayPalProcessor();
      default:
        throw new Error('Unsupported payment provider');
    }
  }
}
```

4. **Strategy Pattern**

```typescript
// Para diferentes estrategias de descuento
interface DiscountStrategy {
  calculate(price: number): number;
}

class PercentageDiscount implements DiscountStrategy {
  constructor(private percentage: number) {}
  calculate(price: number): number {
    return price * (1 - this.percentage / 100);
  }
}

class FixedDiscount implements DiscountStrategy {
  constructor(private amount: number) {}
  calculate(price: number): number {
    return Math.max(0, price - this.amount);
  }
}
```

5. **Middleware Chain Pattern**

```typescript
// Express middleware chain
app.use(cors());
app.use(helmet());
app.use(rateLimiter);
app.use(authenticate);
app.use(authorize);
```

### Frontend Patterns

1. **Component Composition**

```typescript
// Composición sobre herencia
<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
  </CardHeader>
  <CardContent>
    <ProductImage />
    <ProductPrice />
  </CardContent>
  <CardFooter>
    <AddToCartButton />
  </CardFooter>
</Card>
```

2. **Custom Hooks**

```typescript
// Lógica reutilizable
function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product) => {
    // Logic
  }, []);

  const removeItem = useCallback((productId: string) => {
    // Logic
  }, []);

  return { items, addItem, removeItem };
}
```

3. **Compound Components**

```typescript
// Para componentes complejos
<ProductCard>
  <ProductCard.Image src="..." />
  <ProductCard.Title>Name</ProductCard.Title>
  <ProductCard.Price>$99.99</ProductCard.Price>
  <ProductCard.Actions>
    <Button>Add to Cart</Button>
  </ProductCard.Actions>
</ProductCard>
```

---

## Escalabilidad

### Horizontal Scaling

```
                    ┌─── Load Balancer ───┐
                    │                      │
        ┌───────────┼──────────────────────┼───────────┐
        │           │                      │           │
    ┌───▼───┐   ┌───▼───┐   ┌────▼────┐   ┌───▼───┐
    │Web-1  │   │Web-2  │   │ Web-N   │   │API-1  │
    └───────┘   └───────┘   └─────────┘   └───┬───┘
                                               │
        ┌──────────────────────────────────────┼───────┐
        │                                      │       │
    ┌───▼───┐                              ┌───▼───┐   ┌───▼───┐
    │API-2  │                              │Redis  │   │  DB   │
    └───┬───┘                              │Cluster│   │Primary│
        │                                  └───────┘   └───┬───┘
    ┌───▼───┐                                             │
    │API-N  │                                          ┌──▼──┐
    └───────┘                                          │Read │
                                                       │Repli│
                                                       └─────┘
```

### Performance Optimizations

1. **Frontend**:
   - Code splitting
   - Image optimization (next/image)
   - Lazy loading
   - Prefetching
   - Service Workers (PWA)

2. **Backend**:
   - Connection pooling
   - Query optimization
   - Bulk operations
   - Caching layers
   - Compression (gzip/brotli)

3. **Database**:
   - Índices estratégicos
   - Query plan analysis
   - Partitioning
   - Materialized views
   - Read replicas

---

## Seguridad

### Capas de Seguridad

1. **Network Layer**
   - HTTPS/TLS 1.3
   - Firewall rules
   - DDoS protection (Cloudflare)
   - VPC isolation

2. **Application Layer**
   - Input validation (Zod)
   - SQL injection prevention (Prisma ORM)
   - XSS prevention (sanitization)
   - CSRF tokens
   - Rate limiting
   - JWT authentication
   - Bcrypt password hashing

3. **Data Layer**
   - Encryption at rest
   - Encryption in transit
   - Database access control
   - Regular backups
   - Audit logging

### Authentication Flow

```
┌──────┐         ┌─────────┐         ┌──────┐
│Client│────────▶│NextAuth │────────▶│ API  │
└──────┘  Login  │         │  Verify │      │
            ▲     └─────────┘  Token  └──────┘
            │           │                 │
            │           ▼                 ▼
            │     ┌─────────┐       ┌────────┐
            └─────│  JWT    │◀──────│Database│
             Token│ Secret  │ Query │        │
                  └─────────┘       └────────┘
```

---

## Monitoreo y Observabilidad

### Logging

```typescript
// Structured logging
logger.info('Order created', {
  orderId: order.id,
  userId: user.id,
  amount: order.total,
  timestamp: new Date().toISOString(),
});
```

### Métricas

- **Application Metrics**:
  - Request rate
  - Error rate
  - Response time (p50, p95, p99)
  - Active users

- **Infrastructure Metrics**:
  - CPU usage
  - Memory usage
  - Disk I/O
  - Network throughput

- **Business Metrics**:
  - Orders per minute
  - Revenue per hour
  - Cart abandonment rate
  - Conversion rate

### Alerting

```yaml
alerts:
  - name: HighErrorRate
    condition: error_rate > 5%
    duration: 5m
    severity: critical

  - name: SlowResponseTime
    condition: p95_latency > 2s
    duration: 10m
    severity: warning

  - name: LowStock
    condition: product_stock < threshold
    severity: info
```

---

## Deployment Architecture

### Production Environment

```
┌─────────────── Cloud Provider (AWS/Azure/GCP) ──────────────┐
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Kubernetes Cluster                      │   │
│  │                                                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │ Web Pods │  │ API Pods │  │Admin Pods│          │   │
│  │  │ (3x)     │  │ (5x)     │  │ (2x)     │          │   │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘          │   │
│  │       │             │             │                 │   │
│  │  ┌────▼─────────────▼─────────────▼─────┐          │   │
│  │  │         Ingress Controller           │          │   │
│  │  └──────────────────┬───────────────────┘          │   │
│  └───────────────────────────────────────────────────┘   │
│                        │                                   │
│  ┌─────────────────────▼───────────────────────┐         │
│  │              Load Balancer                   │         │
│  └──────────────────────────────────────────────┘         │
│                                                             │
│  ┌─────────────┐  ┌──────────┐  ┌─────────────┐          │
│  │ PostgreSQL  │  │  Redis   │  │  S3 Bucket  │          │
│  │ (Managed)   │  │(Managed) │  │   Storage   │          │
│  └─────────────┘  └──────────┘  └─────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Referencias

- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Performance Tips](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Redis Best Practices](https://redis.io/docs/manual/patterns/)
