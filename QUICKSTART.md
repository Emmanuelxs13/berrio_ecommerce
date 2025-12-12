# 🎯 QUICKSTART - Berrio E-commerce

## ⚡ Inicio Rápido (5 minutos)

### 1. Pre-requisitos

```bash
# Verificar versiones
node --version  # v20.x o superior
pnpm --version  # v8.x o superior
docker --version
```

### 2. Clonar e instalar

```bash
git clone https://github.com/Emmanuelxs13/berrio_ecommerce.git
cd berrio_ecommerce
pnpm install
```

### 3. Configurar entorno

```bash
# Copiar variables de entorno
cp .env.example .env

# Editar con tus valores (mínimo necesario):
# - DATABASE_URL
# - NEXTAUTH_SECRET
# - JWT_SECRET
```

### 4. Levantar base de datos

```bash
# Con Docker (recomendado)
docker-compose -f docker-compose.dev.yml up -d

# Esperar 10 segundos a que PostgreSQL inicie...
```

### 5. Migrar y seed

```bash
pnpm db:migrate:dev
pnpm db:seed
```

### 6. Iniciar aplicación

```bash
pnpm dev
```

**🎉 ¡Listo!**

- Frontend: http://localhost:3000
- API: http://localhost:4000
- Admin: http://localhost:3001

**Credenciales de prueba:**

- Admin: `admin@berrioecommerce.com` / `password123`

---

## 📂 Estructura del Proyecto

```
berrio_ecommerce/
├── apps/
│   ├── web/            # Frontend (Next.js 14)
│   ├── api/            # Backend API (Express)
│   └── admin/          # Panel Admin (Next.js 14)
├── packages/
│   ├── database/       # Prisma Schema & Migrations
│   ├── ui/             # Componentes UI compartidos
│   ├── config/         # Configuraciones compartidas
│   └── types/          # TypeScript types
├── docs/               # Documentación completa
│   ├── architecture/   # Arquitectura del sistema
│   ├── database/       # Base de datos y diagramas
│   ├── api/            # API endpoints
│   └── deployment/     # Guía de deployment
└── infrastructure/     # Docker, Nginx, K8s
```

---

## 🎨 Stack Tecnológico

| Categoría         | Tecnología                                     |
| ----------------- | ---------------------------------------------- |
| **Frontend**      | Next.js 14, React 18, TypeScript, Tailwind CSS |
| **Backend**       | Node.js 20, Express, TypeScript                |
| **Base de Datos** | PostgreSQL 16, Prisma ORM                      |
| **Cache**         | Redis 7                                        |
| **Autenticación** | NextAuth.js, JWT                               |
| **Pagos**         | Stripe, PayPal                                 |
| **Email**         | SendGrid, Nodemailer                           |
| **Storage**       | AWS S3, Cloudinary                             |
| **Testing**       | Jest, Playwright                               |
| **DevOps**        | Docker, Turborepo, GitHub Actions              |

---

## 🚀 Comandos Principales

```bash
# Desarrollo
pnpm dev              # Inicia todos los servicios
pnpm build            # Build de producción
pnpm start            # Inicia en modo producción
pnpm lint             # Ejecuta linter
pnpm test             # Ejecuta tests

# Base de datos
pnpm db:migrate       # Ejecuta migraciones
pnpm db:migrate:dev   # Ejecuta migraciones (dev)
pnpm db:seed          # Seed de datos
pnpm db:studio        # Abre Prisma Studio
pnpm db:generate      # Genera Prisma Client

# Docker
pnpm docker:dev       # Levanta servicios dev
pnpm docker:down      # Detiene servicios
pnpm docker:logs      # Ver logs

# Limpieza
pnpm clean            # Limpia node_modules y builds
```

---

## 📚 Documentación

| Documento                                     | Descripción               |
| --------------------------------------------- | ------------------------- |
| [README.md](./README.md)                      | Documentación principal   |
| [Architecture](./docs/architecture/README.md) | Arquitectura del sistema  |
| [Database](./docs/database/README.md)         | Base de datos y diagramas |
| [API Docs](./docs/api/README.md)              | Documentación de API      |
| [Deployment](./docs/deployment/README.md)     | Guía de deployment        |

---

## 🐛 Troubleshooting

### Error: "Cannot connect to database"

```bash
# Verificar que Docker esté corriendo
docker-compose ps

# Reiniciar servicios
docker-compose restart
```

### Error: "Port already in use"

```bash
# Cambiar puertos en .env o detener proceso
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows
```

### Error: "Prisma Client not generated"

```bash
pnpm db:generate
```

---

## 🔐 Seguridad

**⚠️ IMPORTANTE:** Antes de deployment a producción:

1. Cambia todos los secrets en `.env`
2. Habilita HTTPS
3. Configura CORS correctamente
4. Implementa rate limiting
5. Revisa [docs/security/checklist.md](./docs/security/checklist.md)

---

## 📞 Soporte

- **GitHub Issues**: https://github.com/Emmanuelxs13/berrio_ecommerce/issues
- **Email**: emmanuelxs13@gmail.com
- **Discord**: [Unirse al servidor](https://discord.gg/berrio-ecommerce)

---

## 📄 Licencia

MIT © 2024 Emmanuel Berrio

---

## 🌟 Features Destacadas

- ✅ Arquitectura escalable y moderna
- ✅ Performance optimizado (Lighthouse 95+)
- ✅ SEO-friendly
- ✅ Responsive design
- ✅ Dark mode
- ✅ Internacionalización
- ✅ PWA ready
- ✅ TypeScript en todo el proyecto
- ✅ Tests incluidos
- ✅ Docker-ready
- ✅ CI/CD configurado
- ✅ Documentación completa

---

## 🎯 Roadmap

- [ ] Multi-tenant support
- [ ] GraphQL API
- [ ] Mobile apps (React Native)
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Multi-currency support
- [ ] Multi-language support
- [ ] Live chat support
- [ ] Inventory management system
- [ ] Vendor/marketplace mode

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles.

---

## ⭐ Dale una estrella

Si este proyecto te fue útil, considera darle una ⭐ en GitHub!

---

**Desarrollado con ❤️ por Emmanuel Berrio**
