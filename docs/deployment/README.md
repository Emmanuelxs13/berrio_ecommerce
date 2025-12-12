# 🚀 Guía de Deployment - Berrio E-commerce

## Índice

1. [Pre-requisitos](#pre-requisitos)
2. [Variables de Entorno](#variables-de-entorno)
3. [Deployment Local](#deployment-local)
4. [Deployment en Docker](#deployment-en-docker)
5. [Deployment en Producción](#deployment-en-producción)
6. [CI/CD con GitHub Actions](#cicd-con-github-actions)
7. [Monitoring y Logs](#monitoring-y-logs)
8. [Troubleshooting](#troubleshooting)

---

## Pre-requisitos

### Software Requerido

- **Node.js** 20.x o superior
- **pnpm** 8.x o superior
- **Docker** & **Docker Compose**
- **PostgreSQL** 16 (si no usas Docker)
- **Redis** 7 (si no usas Docker)
- **Git**

### Cuentas y Servicios

- [ ] Cuenta de Stripe (https://stripe.com)
- [ ] Cuenta de PayPal Developer (https://developer.paypal.com)
- [ ] Cuenta de SendGrid (https://sendgrid.com) o SMTP
- [ ] Cuenta de AWS S3 o Cloudinary (para imágenes)
- [ ] Dominio registrado
- [ ] Servidor/VPS (para producción)

---

## Variables de Entorno

### 1. Copiar archivo de ejemplo

```bash
cp .env.example .env
```

### 2. Configurar variables críticas

```env
# Base de datos
DATABASE_URL="postgresql://user:password@localhost:5432/berrio_ecommerce"

# JWT Secrets (generar con: openssl rand -base64 32)
NEXTAUTH_SECRET="tu-secret-generado-aqui"
JWT_SECRET="tu-jwt-secret-aqui"

# URLs
APP_URL="http://localhost:3000"
API_URL="http://localhost:4000"

# Stripe
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# SendGrid
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@tudominio.com"
```

---

## Deployment Local

### Opción 1: Sin Docker

#### 1. Instalar dependencias

```bash
pnpm install
```

#### 2. Levantar PostgreSQL y Redis localmente

```bash
# PostgreSQL
psql -U postgres
CREATE DATABASE berrio_ecommerce;
\q

# Redis
redis-server
```

#### 3. Ejecutar migraciones

```bash
pnpm db:migrate:dev
```

#### 4. Seed de datos (opcional)

```bash
pnpm db:seed
```

#### 5. Iniciar aplicaciones

```bash
# En una terminal
cd apps/api
pnpm dev

# En otra terminal
cd apps/web
pnpm dev

# En otra terminal
cd apps/admin
pnpm dev
```

**URLs:**

- Frontend: http://localhost:3000
- API: http://localhost:4000
- Admin: http://localhost:3001

### Opción 2: Con Docker (Recomendado)

#### 1. Instalar dependencias

```bash
pnpm install
```

#### 2. Levantar servicios con Docker Compose

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Esto levantará:

- PostgreSQL (puerto 5432)
- Redis (puerto 6379)
- PgAdmin (puerto 5050)
- Redis Commander (puerto 8081)

#### 3. Ejecutar migraciones

```bash
pnpm db:migrate:dev
pnpm db:seed
```

#### 4. Iniciar aplicaciones

```bash
pnpm dev
```

**URLs:**

- Frontend: http://localhost:3000
- API: http://localhost:4000
- Admin: http://localhost:3001
- PgAdmin: http://localhost:5050
- Redis Commander: http://localhost:8081

---

## Deployment en Docker

### Build de imágenes

```bash
# Build API
docker build -t berrio-ecommerce-api:latest -f apps/api/Dockerfile .

# Build Web
docker build -t berrio-ecommerce-web:latest -f apps/web/Dockerfile .

# Build Admin
docker build -t berrio-ecommerce-admin:latest -f apps/admin/Dockerfile .
```

### Run con Docker Compose

```bash
# Crear archivo .env con variables de producción
cp .env.example .env

# Editar .env con valores de producción

# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down
```

---

## Deployment en Producción

### Opción 1: VPS/Dedicated Server

#### 1. Preparar servidor

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Instalar Nginx
sudo apt install nginx -y

# Instalar Certbot (SSL)
sudo apt install certbot python3-certbot-nginx -y
```

#### 2. Clonar repositorio

```bash
cd /opt
sudo git clone https://github.com/Emmanuelxs13/berrio_ecommerce.git
cd berrio_ecommerce
```

#### 3. Configurar variables de entorno

```bash
sudo nano .env
# Configurar todas las variables de producción
```

#### 4. Ejecutar con Docker Compose

```bash
sudo docker-compose up -d
```

#### 5. Configurar Nginx

```bash
# Copiar configuración
sudo cp infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf

# Editar dominios
sudo nano /etc/nginx/nginx.conf

# Verificar configuración
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

#### 6. Configurar SSL con Let's Encrypt

```bash
# Obtener certificado
sudo certbot --nginx -d tudominio.com -d www.tudominio.com -d api.tudominio.com -d admin.tudominio.com

# Renovación automática (crontab)
sudo crontab -e
# Agregar:
0 0 * * * certbot renew --quiet
```

#### 7. Ejecutar migraciones

```bash
sudo docker-compose exec api pnpm db:migrate
```

### Opción 2: Vercel (Frontend) + Railway/Render (Backend)

#### Deploy Frontend en Vercel

```bash
cd apps/web

# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Configurar en Vercel Dashboard:**

- Build Command: `cd ../.. && pnpm install && pnpm build --filter=web`
- Output Directory: `apps/web/.next`
- Install Command: `pnpm install`
- Environment Variables: (agregar todas las necesarias)

#### Deploy Backend en Railway

1. Crear cuenta en https://railway.app
2. Conectar repositorio de GitHub
3. Crear nuevo proyecto
4. Seleccionar `apps/api`
5. Agregar PostgreSQL addon
6. Agregar Redis addon
7. Configurar variables de entorno
8. Deploy

#### Deploy Backend en Render

1. Crear cuenta en https://render.com
2. New -> Web Service
3. Conectar repositorio
4. Configurar:
   - Build Command: `cd ../.. && pnpm install && pnpm build --filter=api`
   - Start Command: `cd apps/api && pnpm start`
   - Add PostgreSQL database
   - Add Redis
5. Agregar variables de entorno
6. Deploy

### Opción 3: AWS/GCP/Azure con Kubernetes

Ver: [kubernetes-deployment.md](./kubernetes-deployment.md)

---

## CI/CD con GitHub Actions

### Crear workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test
      - run: pnpm lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: |
          docker build -t ${{ secrets.DOCKER_REGISTRY }}/berrio-api:${{ github.sha }} -f apps/api/Dockerfile .
          docker build -t ${{ secrets.DOCKER_REGISTRY }}/berrio-web:${{ github.sha }} -f apps/web/Dockerfile .

      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push ${{ secrets.DOCKER_REGISTRY }}/berrio-api:${{ github.sha }}
          docker push ${{ secrets.DOCKER_REGISTRY }}/berrio-web:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/berrio_ecommerce
            git pull
            docker-compose pull
            docker-compose up -d
            docker-compose exec -T api pnpm db:migrate
```

### Secrets de GitHub

Agregar en: Repository Settings > Secrets and variables > Actions

```
DATABASE_URL
JWT_SECRET
NEXTAUTH_SECRET
STRIPE_SECRET_KEY
SENDGRID_API_KEY
DOCKER_REGISTRY
DOCKER_USERNAME
DOCKER_PASSWORD
SERVER_HOST
SERVER_USER
SSH_PRIVATE_KEY
```

---

## Monitoring y Logs

### Logs de Docker

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f api
docker-compose logs -f web

# Últimas 100 líneas
docker-compose logs --tail=100 api
```

### Health Checks

```bash
# API Health
curl http://localhost:4000/health

# Web Health
curl http://localhost:3000/api/health

# Database
docker-compose exec postgres pg_isready

# Redis
docker-compose exec redis redis-cli ping
```

### Monitoring con Prometheus + Grafana

Ver: [monitoring-setup.md](./monitoring-setup.md)

---

## Troubleshooting

### Problema: Base de datos no conecta

**Solución:**

```bash
# Verificar que PostgreSQL esté corriendo
docker-compose ps

# Ver logs de PostgreSQL
docker-compose logs postgres

# Verificar conexión
docker-compose exec postgres psql -U postgres -c "SELECT 1"

# Verificar DATABASE_URL en .env
```

### Problema: Redis no conecta

**Solución:**

```bash
# Verificar que Redis esté corriendo
docker-compose exec redis redis-cli ping

# Ver logs de Redis
docker-compose logs redis

# Verificar REDIS_URL en .env
```

### Problema: Migraciones fallan

**Solución:**

```bash
# Resetear migraciones (CUIDADO: elimina datos)
pnpm db:migrate:reset

# Aplicar migraciones manualmente
pnpm db:migrate

# Ver estado de migraciones
pnpm prisma migrate status
```

### Problema: Out of memory

**Solución:**

```bash
# Aumentar límite de memoria en docker-compose.yml
services:
  api:
    mem_limit: 2g
    mem_reservation: 1g

# Reiniciar servicios
docker-compose restart
```

### Problema: SSL no funciona

**Solución:**

```bash
# Verificar certificados
sudo certbot certificates

# Renovar certificados
sudo certbot renew

# Verificar configuración de Nginx
sudo nginx -t
```

### Problema: Aplicación lenta

**Checklist:**

- [ ] Verificar logs de errores
- [ ] Revisar uso de CPU/RAM con `docker stats`
- [ ] Verificar queries lentos en PostgreSQL
- [ ] Revisar cache hit rate de Redis
- [ ] Verificar índices de base de datos
- [ ] Optimizar imágenes (usar CDN)
- [ ] Habilitar compresión gzip

---

## Backup Automático

### Script de backup diario

```bash
#!/bin/bash
# /opt/berrio_ecommerce/backup.sh

BACKUP_DIR="/backups/berrio-ecommerce"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup PostgreSQL
docker-compose exec -T postgres pg_dump -U postgres berrio_ecommerce | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"

# Backup Redis
docker-compose exec -T redis redis-cli --rdb /data/dump.rdb
docker cp $(docker-compose ps -q redis):/data/dump.rdb "$BACKUP_DIR/redis_$DATE.rdb"

# Backup uploads
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" ./uploads/

# Retener últimos 30 días
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

### Configurar cron

```bash
sudo crontab -e
# Agregar:
0 2 * * * /opt/berrio_ecommerce/backup.sh
```

---

## Performance Tuning

### PostgreSQL

```sql
-- postgresql.conf
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 128MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 4MB
min_wal_size = 1GB
max_wal_size = 4GB
```

### Redis

```conf
# redis.conf
maxmemory 512mb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
```

### Node.js

```bash
# Aumentar límite de memoria
NODE_OPTIONS=--max-old-space-size=4096
```

---

## Seguridad

### Checklist de Seguridad

- [ ] HTTPS habilitado (Let's Encrypt)
- [ ] Firewall configurado (ufw)
- [ ] Rate limiting habilitado
- [ ] CORS configurado correctamente
- [ ] Secrets en variables de entorno (no en código)
- [ ] Backups automáticos configurados
- [ ] Monitoring y alertas activos
- [ ] Logs centralizados
- [ ] Actualizaciones automáticas de seguridad
- [ ] 2FA habilitado para admin
- [ ] Validación de inputs
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF tokens

---

## Rollback

### En caso de error en deployment

```bash
# Ver versiones anteriores
git log --oneline

# Hacer rollback
git revert HEAD
git push

# O revertir a commit específico
git reset --hard <commit-hash>
git push -f

# Restaurar backup de BD
gunzip < /backups/db_20240101_020000.sql.gz | docker-compose exec -T postgres psql -U postgres berrio_ecommerce
```

---

## Recursos Adicionales

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PostgreSQL Performance](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Nginx Tuning](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/docs/)

---

## Soporte

¿Problemas con el deployment?

- Email: support@berrioecommerce.com
- GitHub Issues: https://github.com/Emmanuelxs13/berrio_ecommerce/issues
- Discord: https://discord.gg/berrio-ecommerce
