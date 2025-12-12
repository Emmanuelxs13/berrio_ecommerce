# 🚀 START GUIDE - Berrio E-commerce

## ⚡ Inicio Rápido (5 minutos)

### Opción 1: Script Automático (RECOMENDADO)

```powershell
# Ejecutar el script de inicio
.\start.ps1
```

Este script hace TODO automáticamente:

- ✅ Instala dependencias
- ✅ Inicia Docker (PostgreSQL + Redis)
- ✅ Genera Prisma Client
- ✅ Aplica migraciones
- ✅ Inserta datos de prueba
- ✅ Abre servidores en nuevas ventanas

---

### Opción 2: Manual Paso a Paso

#### 1️⃣ Instalar Dependencias

```powershell
# Instalar pnpm globalmente (si no lo tienes)
npm install -g pnpm

# Instalar todas las dependencias
pnpm install
```

#### 2️⃣ Iniciar Base de Datos

```powershell
# Iniciar Docker Compose
docker-compose -f docker-compose.dev.yml up -d

# Verificar que estén corriendo
docker ps
```

#### 3️⃣ Configurar Base de Datos

```powershell
# Generar Prisma Client
pnpm db:generate

# Aplicar migraciones
pnpm db:migrate:dev

# Insertar datos de prueba
pnpm db:seed
```

#### 4️⃣ Iniciar Servidores

**Terminal 1 - Backend API:**

```powershell
pnpm --filter @berrio/api dev
```

API disponible en: `http://localhost:4000`

**Terminal 2 - Frontend Web:**

```powershell
pnpm --filter @berrio/web dev
```

Web disponible en: `http://localhost:3000`

---

## 🔐 Credenciales de Prueba

### Usuario Admin

- **Email:** admin@berrio.com
- **Password:** admin123
- **Rol:** Administrador completo

### Usuario Cliente

- **Email:** customer1@example.com
- **Password:** password123
- **Rol:** Cliente normal

---

## 🛒 Datos de Prueba Incluidos

El seed crea automáticamente:

### Marcas (12)

- Apple, Samsung, Sony, Dell, HP, Lenovo, LG, Microsoft, Google, Amazon, Asus, Acer

### Categorías (6 principales + subcategorías)

- 📱 Smartphones & Tablets
- 💻 Computadoras
- 🎧 Audio
- 📷 Cámaras
- ⌚ Wearables
- 🎮 Gaming

### Productos (50+)

- iPhones, MacBooks, iPads
- Samsung Galaxy, Dell XPS
- Sony Headphones, Cameras
- Y muchos más...

### Órdenes de Ejemplo

- 5 órdenes completas con diferentes estados
- Pagos procesados
- Reseñas de productos

---

## 🌐 URLs Importantes

| Servicio            | URL                          | Descripción                   |
| ------------------- | ---------------------------- | ----------------------------- |
| **Frontend**        | http://localhost:3000        | Aplicación web del e-commerce |
| **API**             | http://localhost:4000        | Backend REST API              |
| **API Health**      | http://localhost:4000/health | Health check endpoint         |
| **PgAdmin**         | http://localhost:5050        | Administrador de PostgreSQL   |
| **Redis Commander** | http://localhost:8081        | Administrador de Redis        |

### PgAdmin Credentials

- **Email:** admin@berrio.com
- **Password:** admin123

Para conectar a PostgreSQL en PgAdmin:

- **Host:** postgres (o localhost)
- **Port:** 5432
- **Database:** berrio_ecommerce
- **Username:** berrio
- **Password:** password

---

## 🧪 Probar la Aplicación

### 1. Explorar la Tienda

1. Visita `http://localhost:3000`
2. Navega por los productos destacados
3. Usa el buscador
4. Filtra por categorías o marcas

### 2. Proceso de Compra

1. Agrega productos al carrito
2. Ve al carrito (`/cart`)
3. Inicia sesión o regístrate
4. Completa el checkout

### 3. Panel de Usuario

1. Inicia sesión con credenciales de cliente
2. Ve a "Mi Perfil"
3. Revisa "Mis Órdenes"
4. Edita tu perfil

### 4. Probar API Directamente

```powershell
# Obtener productos
curl http://localhost:4000/api/v1/products

# Obtener producto específico
curl http://localhost:4000/api/v1/products/[ID]

# Login
curl -X POST http://localhost:4000/api/v1/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"customer1@example.com","password":"password123"}'
```

---

## 🔧 Comandos Útiles

```powershell
# Ver logs de Docker
docker-compose -f docker-compose.dev.yml logs -f

# Reiniciar servicios Docker
docker-compose -f docker-compose.dev.yml restart

# Detener servicios Docker
docker-compose -f docker-compose.dev.yml down

# Limpiar base de datos y empezar de nuevo
docker-compose -f docker-compose.dev.yml down -v
pnpm db:migrate:dev
pnpm db:seed

# Reiniciar todo desde cero
docker-compose -f docker-compose.dev.yml down -v
pnpm install
pnpm db:generate
pnpm db:migrate:dev
pnpm db:seed
```

---

## 🐛 Troubleshooting

### El frontend no se conecta al API

- Verifica que el API esté corriendo en `http://localhost:4000`
- Revisa la variable `NEXT_PUBLIC_API_URL` en `apps/web/.env.local`

### Error de conexión a PostgreSQL

- Asegúrate de que Docker esté corriendo: `docker ps`
- Verifica que el contenedor postgres esté healthy
- Espera 10-15 segundos después de `docker-compose up`

### Error "Prisma Client not generated"

```powershell
pnpm db:generate
```

### Puerto ya en uso

```powershell
# Cambiar puerto del frontend (package.json)
"dev": "next dev -p 3001"

# Cambiar puerto del API (.env)
API_PORT=4001
```

---

## 📁 Estructura del Proyecto

```
berrio_ecommerce/
├── apps/
│   ├── api/          # Backend Express.js
│   └── web/          # Frontend Next.js
├── packages/
│   └── database/     # Prisma Schema y Seed
├── docs/             # Documentación completa
└── infrastructure/   # Docker, Nginx, etc.
```

---

## 🎯 Próximos Pasos de Desarrollo

Ver `DEVELOPMENT_CHECKLIST.md` para el roadmap completo.

**Prioridades:**

1. ✅ Setup Inicial - COMPLETADO
2. ✅ Backend API - COMPLETADO
3. ✅ Frontend Básico - COMPLETADO
4. ⏳ Páginas de Productos (en progreso)
5. ⏳ Checkout Flow
6. ⏳ Admin Panel
7. ⏳ Testing
8. ⏳ Deployment

---

## 💬 Soporte

¿Problemas? Revisa:

1. `GETTING_STARTED.md` - Guía detallada
2. `docs/` - Documentación completa
3. Logs de Docker y servidores

---

**¡Disfruta desarrollando! 🚀**
