#!/bin/bash

# Script de inicio rápido para Cayapa Solar
# Inicia frontend y backend simultáneamente

echo "🌞 Cayapa Solar - Inicio Rápido"
echo "================================"
echo ""

# Colores para terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo -e "${YELLOW}⚠️  Error: Debes ejecutar este script desde la raíz del proyecto cayapa-solar${NC}"
    echo "   Ejemplo: cd ~/proyectos/hackathon-2025-mmerge/cayapa-solar"
    exit 1
fi

# Verificar que node_modules existen
echo -e "${BLUE}📦 Verificando dependencias...${NC}"

if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependencias del frontend...${NC}"
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependencias del backend...${NC}"
    cd backend && npm install && cd ..
fi

# Verificar archivo .env en frontend
if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  Creando archivo .env desde .env.example...${NC}"
    cp frontend/.env.example frontend/.env
fi

# Verificar archivo solar-data.json en backend
if [ ! -f "backend/solar-data.json" ]; then
    echo -e "${YELLOW}⚠️  Falta el archivo backend/solar-data.json${NC}"
    echo "   Este archivo debe contener los datos de prueba de energía solar"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Todas las verificaciones pasaron${NC}"
echo ""
echo -e "${BLUE}🚀 Iniciando servidores...${NC}"
echo ""
echo -e "${GREEN}Backend:${NC}  http://localhost:3001"
echo -e "${GREEN}Frontend:${NC} http://localhost:3000"
echo ""
echo -e "${YELLOW}Presiona Ctrl+C para detener ambos servidores${NC}"
echo ""

# Crear archivos de log
mkdir -p logs
BACKEND_LOG="logs/backend.log"
FRONTEND_LOG="logs/frontend.log"

# Iniciar backend en background
cd backend
npm run dev > ../$BACKEND_LOG 2>&1 &
BACKEND_PID=$!
cd ..

# Esperar 3 segundos para que el backend inicie
sleep 3

# Iniciar frontend en background
cd frontend
npm run dev > ../$FRONTEND_LOG 2>&1 &
FRONTEND_PID=$!
cd ..

# Función para limpiar al salir
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Deteniendo servidores...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Servidores detenidos${NC}"
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT SIGTERM

echo -e "${GREEN}✅ Servidores iniciados${NC}"
echo ""
echo "📋 Logs disponibles en:"
echo "   - Backend:  $BACKEND_LOG"
echo "   - Frontend: $FRONTEND_LOG"
echo ""
echo "Ver logs en tiempo real:"
echo "   tail -f $BACKEND_LOG"
echo "   tail -f $FRONTEND_LOG"
echo ""

# Esperar a que los procesos terminen
wait $BACKEND_PID $FRONTEND_PID
