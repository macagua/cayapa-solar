# Guía de Prueba - Integración Frontend-Backend

## ✅ Checklist de Verificación

### 1. Verificar Backend (Puerto 3001)

Abre una terminal en la carpeta `backend`:

```bash
cd backend
npm run dev
```

**Verifica que veas:**
```
ready - started server on 0.0.0.0:3001, url: http://localhost:3001
```

**Prueba el endpoint manualmente:**
```bash
curl http://localhost:3001/api/read
```

Deberías ver un JSON con datos de energía de las placas solares.

---

### 2. Verificar Frontend (Puerto 3000)

Abre otra terminal en la carpeta `frontend`:

```bash
cd frontend
npm run dev
```

**Verifica que veas:**
```
VITE v5.4.6  ready in xxx ms

➜  Local:   http://localhost:3000/
```

---

### 3. Probar la Integración

1. **Abre el navegador:** http://localhost:3000

2. **Inicia sesión:**
   - Email: cualquier email válido (ej: `admin@cayapa.solar`)
   - Password: cualquier contraseña (ej: `admin`)

3. **Ve a la página de Placas:**
   - Clic en **"Total Placas"** en el menú lateral
   - O navega directamente: http://localhost:3000/placas

4. **Verifica el mapa:**
   - ✅ Mapa de Madrid cargado
   - ✅ 3 marcadores de placas solares visibles
   - ✅ Panel de información en el lado derecho

5. **Selecciona una placa:**
   - Haz clic en cualquier marcador del mapa
   - ✅ La información de la placa se actualiza en el panel

6. **Verifica la tabla de energía:**
   - ✅ Se muestra un spinner de carga inicialmente
   - ✅ La tabla se llena con datos del backend
   - ✅ Columnas visibles: Device ID, Energía (kWh), Fecha y Hora, Transaction Link
   - ✅ Los datos están filtrados por la placa seleccionada
   - ✅ Los enlaces de transacción son clicables

---

## 🐛 Solución de Problemas

### Error: "Failed to fetch"

**Causa:** El backend no está ejecutándose en el puerto 3001.

**Solución:**
```bash
cd backend
npm run dev
```

---

### Error: "CORS policy"

**Causa:** El backend no permite peticiones desde localhost:3000.

**Solución:** Ya configurado en `/backend/pages/api/read.ts` con:
```typescript
res.setHeader('Access-Control-Allow-Origin', '*')
```

Si persiste, verifica que el backend se haya reiniciado después de los cambios.

---

### La tabla está vacía

**Causa:** El archivo `solar-data.json` no existe o está vacío.

**Solución:** 
1. Verifica que existe: `/backend/solar-data.json`
2. Debe contener datos de ejemplo con device_id: "12345", "12346", "12347"

---

### Los marcadores del mapa no aparecen

**Causa:** Leaflet CSS no cargado.

**Solución:** Verifica en `/frontend/index.html` que existe:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

---

## 📊 Datos de Prueba

El archivo `backend/solar-data.json` contiene 8 registros de prueba:

- **Placa 12345:** 3 registros (245.5 kWh, 312.8 kWh, 289.2 kWh)
- **Placa 12346:** 2 registros (198.4 kWh, 276.1 kWh)
- **Placa 12347:** 3 registros (421.7 kWh, 398.5 kWh, 445.9 kWh)

---

## 🔄 Flujo de Datos

```
Usuario selecciona placa en mapa
    ↓
Frontend detecta cambio (useEffect)
    ↓
Fetch a http://localhost:3001/api/read
    ↓
Backend lee solar-data.json
    ↓
Backend responde con EnergyDataStored[]
    ↓
Frontend filtra por device_id de placa seleccionada
    ↓
Tabla se actualiza con datos filtrados
```

---

## ✨ Funcionalidades Implementadas

✅ Mapa interactivo con React Leaflet  
✅ 3 paneles solares predefinidos (Madrid)  
✅ Fetch de datos desde backend Next.js  
✅ Tabla responsive con Bootstrap/AdminLTE  
✅ Estados de carga y error  
✅ Formato de fecha legible  
✅ Enlaces a transacciones blockchain  
✅ Filtrado automático por placa seleccionada  
✅ CORS configurado correctamente  
✅ Variables de entorno (.env)  

---

## 🚀 Próximos Pasos

- [ ] Implementar React Query para caché y refetch automático
- [ ] Agregar paginación si hay muchos registros
- [ ] Botón de refresh manual
- [ ] Exportar datos a CSV
- [ ] Gráficos de producción de energía por fecha
- [ ] Filtros por rango de fechas
- [ ] Integración real con blockchain BSV
- [ ] Autenticación real con JWT

---

## 📝 Notas Técnicas

- **Frontend:** React 18 + Vite + TypeScript + AdminLTE 3.2
- **Backend:** Next.js + BSV Blockchain integration
- **Estado:** Zustand (auth, UI)
- **HTTP Client:** Axios con interceptores
- **Mapas:** React Leaflet 4.2.1 + Leaflet 1.9.4
- **Estilos:** SCSS + AdminLTE CDN
- **Router:** React Router v6 con lazy loading

---

¿Algún problema? Verifica:
1. ✅ Ambos servidores corriendo (3000 y 3001)
2. ✅ Archivo .env existe en frontend
3. ✅ Archivo solar-data.json existe en backend
4. ✅ Consola del navegador sin errores CORS
5. ✅ Network tab muestra petición exitosa a /api/read
