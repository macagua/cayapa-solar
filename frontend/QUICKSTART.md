# 🚀 Inicio Rápido - Cayapa Solar Admin Panel

## Instalación en 3 pasos

### 1️⃣ Instalar dependencias
```bash
cd frontend
npm install
```

### 2️⃣ Configurar variables de entorno
```bash
cp .env.example .env
```

Edita `.env` si necesitas cambiar la URL de la API.

### 3️⃣ Iniciar aplicación
```bash
npm run dev
```

¡Listo! 🎉 Abre [http://localhost:3000](http://localhost:3000)

---

## 📋 Credenciales de prueba

- **Email:** admin@cayapasolar.com
- **Password:** admin123

(Nota: Esto es solo para desarrollo. En producción usar autenticación real)

---

## 🛠️ Comandos útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor desarrollo

# Producción
npm run build            # Compila para producción
npm run preview          # Preview de producción

# Calidad de código
npm run lint             # Verifica código
npm run lint:fix         # Corrige errores automáticamente
npm run format           # Formatea código
npm run type-check       # Verifica tipos TypeScript
```

---

## 📁 Estructura principal

```
src/
├── components/    # Componentes reutilizables
├── pages/         # Páginas de la app
├── layouts/       # Layouts (Header, Sidebar, Footer)
├── router/        # Configuración de rutas
├── store/         # Estado global (Zustand)
├── services/      # Servicios API
├── hooks/         # Custom hooks
├── types/         # TypeScript types
└── utils/         # Utilidades
```

---

## 🎯 Próximos pasos

1. **Personalizar branding:** Edita colores en `src/styles/main.scss`
2. **Agregar páginas:** Crea componentes en `src/pages/`
3. **Conectar API:** Configura `VITE_API_BASE_URL` en `.env`
4. **Agregar menús:** Edita navegación en `src/layouts/Sidebar.tsx`

---

## 📚 Documentación completa

Lee el [README.md](./README.md) completo para más detalles.

---

## 🆘 ¿Problemas?

Si tienes algún error:

1. Verifica que tienes Node.js >= 18
2. Borra `node_modules` y vuelve a instalar:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Revisa la consola del navegador (F12)

---

**Happy Coding! 🎨⚡️**
