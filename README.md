# 🛒 Berrio E-commerce - Plataforma de Venta de Dispositivos Electrónicos

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Descripción

Plataforma e-commerce de alto rendimiento diseñada para la venta de dispositivos electrónicos. Arquitectura moderna, escalable y optimizada para soportar miles de usuarios concurrentes.

## 🏗️ Arquitectura

```
berrio_ecommerce/
├── apps/
│   ├── web/                    # Frontend Next.js 14
│   ├── api/                    # Backend API REST
│   └── admin/                  # Panel de administración
├── packages/
│   ├── database/               # Prisma Schema & Migrations
│   ├── ui/                     # Componentes compartidos
│   ├── config/                 # Configuraciones compartidas
│   └── types/                  # TypeScript types compartidos
├── docs/
│   ├── architecture/           # Diagramas de arquitectura
│   ├── database/               # Documentación de BD
│   └── api/                    # Documentación API
└── infrastructure/
    ├── docker/                 # Dockerfiles
    └── kubernetes/             # K8s manifests (producción)
```

## ✨ Características Principales

### 🛍️ E-commerce Core

- ✅ Catálogo de productos dinámico y optimizado
- ✅ Filtros avanzados (categoría, precio, marca, especificaciones)
- ✅ Búsqueda inteligente con autocomplete
- ✅ Carrito de compras persistente
- ✅ Checkout seguro multi-paso
- ✅ Gestión de órdenes en tiempo real
- ✅ Tracking de envíos

### 👤 Gestión de Usuarios

- ✅ Autenticación con NextAuth.js (Email, Google, GitHub)
- ✅ Perfiles de usuario personalizables
- ✅ Historial de compras
- ✅ Lista de deseos
- ✅ Direcciones de envío múltiples
- ✅ Métodos de pago guardados

### 💳 Pagos & Facturación

- ✅ Stripe Integration
- ✅ PayPal Integration
- ✅ Pagos con tarjeta de crédito/débito
- ✅ Procesamiento seguro PCI-DSS
- ✅ Facturas automáticas en PDF
- ✅ Reembolsos y cancelaciones

### 📊 Panel de Administración

- ✅ Dashboard con métricas en tiempo real
- ✅ Gestión de productos (CRUD completo)
- ✅ Control de inventario
- ✅ Gestión de órdenes
- ✅ Análisis de ventas
- ✅ Gestión de usuarios y roles
- ✅ Reportes exportables

### 🚀 Rendimiento & SEO

- ✅ SSR (Server-Side Rendering)
- ✅ ISR (Incremental Static Regeneration)
- ✅ Optimización de imágenes (Next.js Image)
- ✅ Lazy loading
- ✅ Code splitting automático
- ✅ Meta tags dinámicos
- ✅ Sitemap XML
- ✅ robots.txt
- ✅ Schema.org markup (JSON-LD)
- ✅ Core Web Vitals optimizados

### 🔒 Seguridad

- ✅ HTTPS obligatorio
- ✅ Autenticación JWT
- ✅ Rate limiting
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Validación de datos (Zod)
- ✅ Encriptación de datos sensibles

### 📱 Responsive & Accesibilidad

- ✅ Mobile-first design
- ✅ PWA ready
- ✅ WCAG 2.1 AA compliant
- ✅ Dark mode
- ✅ Internacionalización (i18n)

## 🛠️ Tecnologías

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4 + HeadlessUI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios + TanStack Query
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion

### Backend

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript 5.3
- **ORM**: Prisma 5
- **Authentication**: NextAuth.js + JWT
- **Validation**: Zod
- **File Upload**: Multer + Sharp
- **Email**: Nodemailer + SendGrid
- **Payments**: Stripe SDK + PayPal SDK

### Base de Datos

- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Search**: PostgreSQL Full-Text Search
- **Migrations**: Prisma Migrate

### DevOps & Tools

- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library + Playwright
- **CI/CD**: GitHub Actions
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes (producción)
- **Monitoring**: Sentry + Prometheus + Grafana

## 📦 Prerequisitos

- Node.js 20.x o superior
- pnpm 8.x o superior
- Docker & Docker Compose
- PostgreSQL 16 (si no usas Docker)
- Redis 7 (si no usas Docker)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Emmanuelxs13/berrio_ecommerce.git
cd berrio_ecommerce
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales.

### 4. Levantar servicios con Docker

```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml up -d

# Producción
docker-compose up -d
```

### 5. Ejecutar migraciones

```bash
pnpm db:migrate
pnpm db:seed
```

### 6. Iniciar desarrollo

```bash
pnpm dev
```

**URLs de desarrollo:**

- Frontend: http://localhost:3000
- API: http://localhost:4000
- Admin Panel: http://localhost:3001
- API Docs: http://localhost:4000/api-docs

## 📖 Documentación

- [Arquitectura del Sistema](./docs/architecture/README.md)
- [Base de Datos](./docs/database/README.md)
- [API Documentation](./docs/api/README.md)
- [Deployment Guide](./docs/deployment/README.md)
- [Security Best Practices](./docs/security/README.md)

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:coverage
```

## 🚢 Deployment

### Docker

```bash
# Build images
docker build -t berrio-ecommerce-web -f apps/web/Dockerfile .
docker build -t berrio-ecommerce-api -f apps/api/Dockerfile .

# Run containers
docker-compose up -d
```

### Vercel (Frontend)

```bash
cd apps/web
vercel --prod
```

### Railway/Render (Backend)

Conecta tu repositorio y configura las variables de entorno.

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, SEO, Accessibility, Best Practices)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Core Web Vitals**: Todos en verde

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Emmanuel Berrio**

- GitHub: [@Emmanuelxs13](https://github.com/Emmanuelxs13)

## 🙏 Agradecimientos

- Next.js Team
- Vercel
- Prisma Team
- Stripe
- Toda la comunidad open source

---

⭐ **Si este proyecto te fue útil, considera darle una estrella en GitHub!**
