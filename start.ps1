# Script de inicio rápido para Berrio E-commerce
Write-Host "🚀 BERRIO E-COMMERCE - INICIO RÁPIDO" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Verificar si pnpm está instalado
Write-Host "📦 Verificando pnpm..." -ForegroundColor Yellow
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ pnpm no está instalado. Instalando..." -ForegroundColor Red
    npm install -g pnpm
}
Write-Host "✅ pnpm instalado`n" -ForegroundColor Green

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
pnpm install
Write-Host "✅ Dependencias instaladas`n" -ForegroundColor Green

# Verificar si Docker está corriendo
Write-Host "🐳 Verificando Docker..." -ForegroundColor Yellow
$dockerRunning = docker ps 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker no está corriendo. Por favor inicia Docker Desktop." -ForegroundColor Red
    Write-Host "Presiona cualquier tecla para continuar cuando Docker esté listo..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
Write-Host "✅ Docker está corriendo`n" -ForegroundColor Green

# Iniciar servicios Docker
Write-Host "🐳 Iniciando PostgreSQL y Redis..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up -d
Start-Sleep -Seconds 5
Write-Host "✅ Base de datos iniciada`n" -ForegroundColor Green

# Generar Prisma Client
Write-Host "🔧 Generando Prisma Client..." -ForegroundColor Yellow
pnpm db:generate
Write-Host "✅ Prisma Client generado`n" -ForegroundColor Green

# Aplicar migraciones
Write-Host "🔧 Aplicando migraciones..." -ForegroundColor Yellow
pnpm db:migrate:dev
Write-Host "✅ Migraciones aplicadas`n" -ForegroundColor Green

# Seed de datos
Write-Host "🌱 Poblando base de datos con datos de prueba..." -ForegroundColor Yellow
pnpm db:seed
Write-Host "✅ Datos de prueba insertados`n" -ForegroundColor Green

Write-Host "`n" -ForegroundColor Green
Write-Host "🎉 ¡TODO LISTO!" -ForegroundColor Green
Write-Host "===============`n" -ForegroundColor Green

Write-Host "📝 Credenciales de prueba:" -ForegroundColor Cyan
Write-Host "  Admin:" -ForegroundColor Yellow
Write-Host "    Email: admin@berrio.com" -ForegroundColor White
Write-Host "    Password: admin123" -ForegroundColor White
Write-Host "`n  Cliente:" -ForegroundColor Yellow
Write-Host "    Email: customer1@example.com" -ForegroundColor White
Write-Host "    Password: password123`n" -ForegroundColor White

Write-Host "🚀 Para iniciar los servidores:" -ForegroundColor Cyan
Write-Host "  1. API Backend:  pnpm --filter @berrio/api dev" -ForegroundColor White
Write-Host "  2. Frontend Web: pnpm --filter @berrio/web dev`n" -ForegroundColor White

Write-Host "🌐 URLs:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  API:      http://localhost:4000" -ForegroundColor White
Write-Host "  PgAdmin:  http://localhost:5050`n" -ForegroundColor White

Write-Host "💡 Presiona cualquier tecla para abrir los servidores..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Abrir terminales para cada servidor
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🔧 BACKEND API' -ForegroundColor Cyan; pnpm --filter @berrio/api dev"
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🎨 FRONTEND WEB' -ForegroundColor Cyan; pnpm --filter @berrio/web dev"
Start-Sleep -Seconds 2

Write-Host "`n✨ Servidores iniciándose en nuevas ventanas..." -ForegroundColor Green
Write-Host "Espera 10-15 segundos y visita http://localhost:3000" -ForegroundColor Yellow
