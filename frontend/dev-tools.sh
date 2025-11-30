#!/bin/bash

# Script de desarrollo para Cayapa Solar Admin Panel
# Este script proporciona comandos útiles para el desarrollo

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${1}${NC}"
}

print_error() {
    echo -e "${RED}✗ ${1}${NC}"
}

# Banner
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║   Cayapa Solar - Dev Tools            ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}"

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "Este script debe ejecutarse desde la carpeta frontend"
    exit 1
fi

# Menú principal
echo "Selecciona una opción:"
echo "1) 🚀 Iniciar servidor de desarrollo"
echo "2) 🔨 Build para producción"
echo "3) 👁  Preview de producción"
echo "4) 🧹 Limpiar node_modules y reinstalar"
echo "5) ✨ Formatear código"
echo "6) 🔍 Verificar código (lint + type-check)"
echo "7) 📊 Analizar bundle size"
echo "8) 🔄 Actualizar dependencias"
echo "9) ❌ Salir"
echo ""

read -p "Opción: " option

case $option in
    1)
        print_info "Iniciando servidor de desarrollo..."
        npm run dev
        ;;
    2)
        print_info "Compilando para producción..."
        npm run build
        print_success "Build completado! Revisa la carpeta dist/"
        ;;
    3)
        print_info "Iniciando preview de producción..."
        npm run preview
        ;;
    4)
        print_warning "Esto eliminará node_modules y reinstalará todo"
        read -p "¿Continuar? (s/n): " confirm
        if [ "$confirm" = "s" ]; then
            print_info "Eliminando node_modules..."
            rm -rf node_modules package-lock.json
            print_info "Instalando dependencias..."
            npm install
            print_success "Reinstalación completa!"
        else
            print_info "Operación cancelada"
        fi
        ;;
    5)
        print_info "Formateando código..."
        npm run format
        print_success "Código formateado!"
        ;;
    6)
        print_info "Verificando código con ESLint..."
        npm run lint
        print_info "Verificando tipos TypeScript..."
        npm run type-check
        print_success "Verificación completa!"
        ;;
    7)
        print_info "Analizando tamaño del bundle..."
        npm run build -- --mode analyze
        ;;
    8)
        print_warning "Esto actualizará todas las dependencias"
        read -p "¿Continuar? (s/n): " confirm
        if [ "$confirm" = "s" ]; then
            print_info "Actualizando dependencias..."
            npm update
            print_success "Dependencias actualizadas!"
        else
            print_info "Operación cancelada"
        fi
        ;;
    9)
        print_info "¡Hasta luego!"
        exit 0
        ;;
    *)
        print_error "Opción no válida"
        exit 1
        ;;
esac

echo ""
print_success "Operación completada!"
