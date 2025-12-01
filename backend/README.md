# Madrid Solar - API Rest

Backend API para el sistema de monitoreo de energía solar con tecnología BSV Blockchain.

## 🎨 Capturas de Pantalla

### Backend API Docs

<img src="../docs/madrid_solar_backend.png" alt="Backend - API Docs" width="800" height="548">

---

## 🌐 Documentación de la API

Al iniciar el servidor, accede a:
- **Raíz**: `http://localhost:3001/` - Redirecciona automáticamente a la documentación
- **Documentación Swagger**: `http://localhost:3001/api-doc` - Interfaz interactiva de la API

---

## 📡 Endpoints Principales

### Energy Data

#### `GET /api/read`
Obtiene todos los registros de energía solar almacenados.

**Respuesta:**
```json
[
  {
    "device_id": "cayapa-001",
    "energy": 5.23,
    "timestamp": 1234567890,
    "tx_link": "https://whatsonchain.com/tx/..."
  }
]
```

#### `POST /api/store-json`
Almacena datos de energía en la blockchain BSV.

**Request:**
```json
{
  "device_id": "cayapa-001",
  "energy": 5.23,
  "timestamp": 1234567890
}
```

**Respuesta:**
```json
{
  "txid": "abc123...",
  "tx_link": "https://whatsonchain.com/tx/abc123..."
}
```

### Wallet

#### `GET /api/wallet-info`
Obtiene la clave pública de identidad de la wallet del backend.

**Respuesta:**
```json
{
  "identityKey": "02abc123..."
}
```

**Uso:**
```bash
curl http://localhost:3001/api/wallet-info
```

---

## ✨ Features

- 🌞 **Monitoreo Solar** - Almacenamiento de datos de energía solar en tiempo real
- ⛓️ **BSV Blockchain** - Datos inmutables almacenados en la blockchain
- 📡 **IoT Integration** - Recepción de datos desde dispositivos ESP32
- 🔐 **OP_RETURN** - Almacenamiento eficiente de datos en transacciones BSV
- ⚡ **API REST** - Endpoints documentados con Swagger/OpenAPI
- 📊 **Real-time Data** - Acceso instantáneo a métricas de energía

---

## 🏗️ Architecture

### Components

- **Frontend (React + Vite)** - Panel de administración con visualización de datos
- **Backend API (Next.js)** - API REST para almacenamiento y consulta de datos
- **Microprocessor (ESP32)** - Dispositivos IoT que reportan métricas de energía
- **BSV Blockchain** - Almacenamiento inmutable de datos mediante OP_RETURN
- **Storage** - Archivo JSON local para cache de datos (`solar-data.json`)

### Key Technologies

- [BSV SDK](https://docs.bsvblockchain.org/) - Transaction building and signing
- [Next.js](https://nextjs.org/) - Framework backend con API Routes
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - Documentación interactiva de API
- [next-swagger-doc](https://www.npmjs.com/package/next-swagger-doc) - Generación automática de OpenAPI spec
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development

---

## 📋 Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- ESP32 device (opcional, para enviar datos reales)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Crea un archivo `.env` en el directorio `backend/`:

```bash
cp .env.example .env
```

Edita `.env` con tu configuración:

```env
# BSV Wallet Configuration
PRIVATE_KEY=your_private_key_here
BSV_NETWORK=mainnet
```

### 3. Start the Server

```bash
npm run dev
```

El servidor estará disponible en:
- **API**: http://localhost:3001/
- **Documentación**: http://localhost:3001/api-doc

## 💡 Usage

### Almacenar Datos de Energía (desde ESP32)

El dispositivo ESP32 envía datos automáticamente cada 5 segundos:

```bash
POST http://192.168.1.XXX:3001/api/store-json
Content-Type: application/json

{
  "device_id": "cayapa-001",
  "energy": 5.23,
  "timestamp": 1234567890
}
```

**Respuesta exitosa:**
```json
{
  "txid": "abc123def456...",
  "tx_link": "https://whatsonchain.com/tx/abc123def456..."
}
```

### Consultar Datos Almacenados

```bash
GET http://localhost:3001/api/read
```

**Respuesta:**
```json
[
  {
    "device_id": "cayapa-001",
    "energy": 5.23,
    "timestamp": 1234567890,
    "tx_link": "https://whatsonchain.com/tx/..."
  }
]
```

### Consultar Información de la Wallet

```bash
curl http://localhost:3001/api/wallet-info
```

**Respuesta:**
```json
{
  "identityKey": "02abc123..."
}
```

### Visualizar Documentación Interactiva

Abre en tu navegador:
```
http://localhost:3001/api-doc
```

Esta interfaz Swagger permite probar todos los endpoints directamente desde el navegador.

---

## 📂 Project Structure

```
backend/
├── pages/
│   ├── index.tsx              # Página principal (redirige a /api-doc)
│   ├── api-doc.tsx            # Documentación Swagger UI interactiva
│   ├── _app.tsx               # Next.js app wrapper
│   └── api/
│       ├── read.ts            # GET - Obtiene datos de energía almacenados
│       ├── store-json.ts      # POST - Almacena datos en blockchain BSV
│       ├── wallet-info.ts     # GET - Información de la wallet BSV
│       └── sensor-status.ts   # GET - Estado del sensor y beneficios
├── src/
│   ├── wallet.ts              # Inicialización y configuración de wallet BSV
│   ├── setupWallet.ts         # Script de configuración inicial de wallet
│   └── types.ts               # Definiciones de tipos TypeScript
├── lib/
│   └── cors.ts                # Configuración CORS para API
├── styles/
│   ├── Home.module.css        # Estilos CSS modulares
│   └── globals.css            # Estilos globales
├── solar-data.json            # Cache local de datos de energía
├── package.json               # Dependencias y scripts npm
├── tsconfig.json              # Configuración TypeScript
├── next.config.js             # Configuración Next.js
└── README.md                  # Esta documentación
```

### Endpoints Activos

| Método | Endpoint | Descripción | Uso |
|--------|----------|-------------|-----|
| `GET` | `/api/read` | Obtiene datos de energía | Consulta de datos históricos |
| `POST` | `/api/store-json` | Almacena datos en blockchain | ESP32 → Backend |
| `GET` | `/api/wallet-info` | Info de wallet BSV | Diagnóstico de sistema |
| `GET` | `/api/sensor-status` | Estado y beneficios del sensor | Datos de usuario y tokens |
| `GET` | `/api-doc` | Documentación Swagger | Interfaz interactiva API |

---

## 📦 Código Fuente Detallado

### Core Modules

#### `/src/wallet.ts` - Wallet BSV Manager
Módulo principal para inicializar y gestionar la wallet BSV del backend.

**Componentes clave:**
- **Wallet Instance**: Instancia de `WalletInterface` compartida por toda la aplicación
- **Key Derivation**: Sistema de derivación de claves usando `KeyDeriver`
- **Storage Manager**: Gestión de almacenamiento de wallet con `WalletStorageManager`
- **Blockchain Integration**: Conexión a red BSV (mainnet/testnet)

**Flujo de inicialización:**
```typescript
1. Cargar PRIVATE_KEY desde variables de entorno (.env)
2. Crear PrivateKey desde string hexadecimal
3. Inicializar KeyDeriver con identityKey
4. Configurar WalletStorageManager + WalletSigner
5. Conectar a servicios BSV (mainnet/testnet)
6. Registrar cliente de storage (Babbage Systems)
7. Exportar instancia de wallet lista para usar
```

**Variables de entorno requeridas:**
- `PRIVATE_KEY`: Clave privada hexadecimal (64 caracteres)
- `STORAGE_URL`: URL del sistema de storage (default: https://storage.babbage.systems)
- `NETWORK`: Red BSV (main/test, default: main)

**Uso en endpoints:**
```typescript
import { wallet } from '../../src/wallet'
const identityKey = await wallet.getPublicKey({ identityKey: true })
```

---

#### `/src/types.ts` - Type Definitions
Definiciones de tipos TypeScript para datos de energía.

**Interfaces:**

```typescript
interface EnergyData {
  device_id: string    // ID del dispositivo ESP32
  energy: number       // Energía en kWh
  timestamp: number | string  // Unix timestamp
}

interface EnergyDataStored extends EnergyData {
  tx_link: string      // URL a WhatsOnChain
}
```

**Uso:** Tipado fuerte para datos de sensores y almacenamiento blockchain.

---

#### `/src/setupWallet.ts` - Wallet Setup Script
Script de inicialización para crear y financiar wallet del backend.

**Funcionalidades:**

1. **Wallet Creation/Recovery:**
   - Verifica si existe `.env` con `PRIVATE_KEY`
   - Si no existe, genera nueva wallet con `PrivateKey.fromRandom()`
   - Guarda configuración en `.env` automáticamente

2. **Wallet Funding:**
   - Conecta a wallet local (JSON-API)
   - Crea transacción de financiamiento (10,000 satoshis default)
   - Usa derivación BRC-29 para generar dirección de pago
   - Internaliza transacción en wallet del backend

3. **Protocol BRC-29:**
   - Protocol ID: `[2, '3241645161d8']`
   - Derivation con `keyID` para seguridad
   - P2PKH locking script para outputs

**Comando:**
```bash
npm run setup
```

**Output:**
```
✓ Backend wallet initialized
✓ Identity: 02abc123...
✓ Funded with 10000 satoshis
✓ TXID: https://whatsonchain.com/tx/...
```

---

#### `/lib/cors.ts` - CORS Configuration
Configuración de Cross-Origin Resource Sharing para permitir solicitudes desde frontend.

**Características:**

- **Allowed Origins:**
  - `http://localhost:3000` (React)
  - `http://localhost:5173` (Vite)
  - `http://127.0.0.1:3000`
  - `http://127.0.0.1:5173`
  - En desarrollo: permite cualquier origen localhost

- **Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers:** Content-Type, Authorization, X-BSV-Payment
- **Credentials:** Enabled
- **Max Age:** 86400 segundos (24 horas)

**Manejo de Preflight:**
```typescript
if (req.method === 'OPTIONS') {
  res.status(200).end()  // Responde inmediatamente
  return true
}
```

**Uso en endpoints:**
```typescript
import { setCorsHeaders } from '../../lib/cors'

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return  // Preflight handled
  // ... resto del endpoint
}
```

---

### API Endpoints

#### `GET /api/read` - Read Energy Data
Obtiene todos los registros de energía solar almacenados localmente.

**Archivo:** `/pages/api/read.ts`

**Funcionalidades:**
- Lee datos desde `solar-data.json`
- Retorna últimos 12 registros (`.splice(0, 12)`)
- Maneja errores de lectura de archivo
- Configura headers CORS

**Respuesta exitosa (200):**
```json
[
  {
    "device_id": "cayapa-001",
    "energy": 5.23,
    "timestamp": 1234567890,
    "tx_link": "https://whatsonchain.com/tx/abc123..."
  }
]
```

**Casos de error:**
- Archivo no existe: retorna `[]`
- JSON inválido: retorna `[]` con log de error

---

#### `POST /api/store-json` - Store on Blockchain
Almacena datos de energía en la blockchain BSV usando transacciones OP_RETURN.

**Archivo:** `/pages/api/store-json.ts`

**Proceso:**

1. **Validación de datos:**
   - Requiere: `device_id`, `energy`, `timestamp`
   - Valida tipos y formatos

2. **Creación de OP_RETURN:**
   - Convierte datos a JSON string
   - Codifica a bytes UTF-8
   - Construye script OP_RETURN con push opcodes
   - Soporta datos hasta 100KB

3. **Transacción BSV:**
   - Crea output con satoshis mínimos (1 sat)
   - Añade script OP_RETURN con datos
   - Firma y transmite a blockchain
   - Retorna TXID y enlace WhatsOnChain

4. **Almacenamiento local:**
   - Guarda en `solar-data.json` (cache)
   - Prepend a array existente
   - Formato: `EnergyDataStored`

**Algoritmo OP_RETURN:**
```typescript
function createOpReturnScript(data: number[]): string {
  // OP_RETURN = 0x6a
  if (data.length < 76) {
    // Push directo: [0x6a, length, ...data]
  } else if (data.length < 256) {
    // OP_PUSHDATA1: [0x6a, 0x4c, length, ...data]
  } else if (data.length < 65536) {
    // OP_PUSHDATA2: [0x6a, 0x4d, length_le16, ...data]
  } else {
    // OP_PUSHDATA4: [0x6a, 0x4e, length_le32, ...data]
  }
  return toHex(script)
}
```

**Request body:**
```json
{
  "device_id": "cayapa-001",
  "energy": 5.23,
  "timestamp": 1234567890
}
```

**Respuesta exitosa (200):**
```json
{
  "txid": "abc123def456...",
  "tx_link": "https://whatsonchain.com/tx/abc123def456..."
}
```

**Modo de desarrollo:**
```typescript
const real_work = false  // Si false, genera TXID fake
// Útil para pruebas sin consumir satoshis
```

---

#### `GET /api/wallet-info` - Wallet Information
Retorna la clave pública de identidad de la wallet del backend.

**Archivo:** `/pages/api/wallet-info.ts`

**Proceso:**
1. Importa instancia de wallet desde `src/wallet.ts`
2. Obtiene clave pública de identidad
3. Retorna en formato JSON

**Respuesta (200):**
```json
{
  "identityKey": "02abc123def456..."
}
```

**Uso:**
- Diagnóstico de sistema
- Verificación de wallet activa
- Integración con frontend

---

#### `GET /api/sensor-status` - Sensor Status & Benefits
Retorna información del dispositivo, tokens comunitarios y beneficios otorgados.

**Archivo:** `/pages/api/sensor-status.ts`

**Funcionalidades:**
- Lee datos de energía desde `solar-data.json`
- Calcula tokens comunitarios acumulados
- Retorna beneficios activos (ej: estacionamiento gratuito)

**Parámetros opcionales:**
- `device_id`: Filtrar por dispositivo específico

**Respuesta (200):**
```json
{
  "device_id": "sensor-001",
  "community_tokens": 33,
  "grants": "granted 3 hours of free green zone parking"
}
```

**Casos de uso:**
- Dashboard de usuario
- Sistema de recompensas
- Gamificación de energía solar

---

### UI Pages

#### `/pages/index.tsx` - Home Redirect
Página raíz que redirige automáticamente a la documentación Swagger.

**Implementación:**
```typescript
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/api-doc',
      permanent: false,  // 302 redirect
    },
  }
}
```

**Razón:** Asegurar que usuarios vean documentación al acceder a `http://localhost:3001/`

---

#### `/pages/api-doc.tsx` - Swagger Documentation
Interfaz interactiva de documentación API usando Swagger UI.

**Características:**

1. **Auto-generación de OpenAPI Spec:**
   - Escanea comentarios JSDoc en `/pages/api/**/*.ts`
   - Extrae anotaciones `@swagger`
   - Genera especificación OpenAPI 3.0

2. **Configuración:**
```typescript
{
  openapi: '3.0.0',
  info: {
    title: 'Madrid Solar API',
    version: '1.0.0',
    description: 'API para gestión de datos de energía solar'
  },
  servers: [
    { url: 'http://localhost:3001', description: 'Desarrollo' }
  ],
  tags: [
    { name: 'Energy Data' },
    { name: 'Wallet' },
    { name: 'Devices' }
  ]
}
```

3. **Dynamic Import:**
   - `SwaggerUI` se carga sin SSR (`{ ssr: false }`)
   - Mejora rendimiento en Next.js

**Acceso:** `http://localhost:3001/api-doc`

---

### Utilities

#### Data Storage Flow

**Escritura (store-json.ts):**
```
ESP32 → HTTP POST → Validación → OP_RETURN Script → BSV TX
                                        ↓
                                  solar-data.json
                                        ↓
                                  Response TXID
```

**Lectura (read.ts):**
```
Frontend → HTTP GET → solar-data.json → Parse JSON → Response Array
```

#### Global State Management

```typescript
let global_state: EnergyDataStored[] = []

export function saveEnergyData(state: EnergyDataStored): void {
  global_state.unshift(state)  // Prepend (más recientes primero)
  writeFileSync(DATA_FILE, JSON.stringify(global_state, null, 2))
}

export function loadEnergyData(): EnergyDataStored[] {
  const data = readFileSync(DATA_FILE, 'utf-8')
  return JSON.parse(data).splice(0, 12)  // Últimos 12
}
```

**Nota:** En producción, migrar a base de datos (PostgreSQL/MongoDB)

## 🔍 How it Works

### Data Storage Flow

1. **ESP32 Device** envía datos de energía solar vía HTTP POST
2. **API Endpoint** (`/api/store-json`) recibe los datos
3. **Data Validation** - Valida formato y tipos de datos
4. **OP_RETURN Script** - Codifica datos en script Bitcoin
5. **BSV Transaction** - Crea, firma y transmite transacción
6. **Blockchain Storage** - Datos inmutables en blockchain BSV
7. **Local Cache** - Datos se guardan en `solar-data.json` para consultas rápidas
8. **TX Link** - Se retorna enlace a WhatsOnChain para verificación

### Data Flow Diagram

```
                      ┌─────────────────────────┐
                      │   ESP32 Device          │
                      │   (Sensor Solar)        │
                      └───────────┬─────────────┘
                                  │
                                  │ HTTP POST
                                  │ {device_id, energy, timestamp}
                                  │
                      ┌───────────▼─────────────┐
                      │  /api/store-json        │
                      │  - Validate data        │
                      │  - Create OP_RETURN     │
                      │  - Sign transaction     │
                      └───────────┬─────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
          ┌─────────▼──────┐     │    ┌────────▼──────────┐
          │ BSV Blockchain │     │    │ solar-data.json   │
          │ (Immutable)    │     │    │ (Local cache)     │
          └─────────┬──────┘     │    └────────┬──────────┘
                    │            │             │
                    │            │             │
          ┌─────────▼──────┐     │    ┌────────▼──────────┐
          │ WhatsOnChain   │     │    │  /api/read        │
          │ Explorer Link  │     │    │  GET endpoint     │
          └────────────────┘     │    └────────┬──────────┘
                                 │             │
                      ┌──────────▼─────────────▼──┐
                      │   Response to ESP32       │
                      │   {txid, tx_link}         │
                      └───────────────────────────┘
                                  │
                      ┌───────────▼─────────────┐
                      │   Frontend Dashboard    │
                      │   (React/Vite)          │
                      └─────────────────────────┘
```

### Blockchain Transaction Structure

**Output 0 (Data):**
```
OP_RETURN <data>
Value: 1 satoshi (dust limit)
```

**Output 1 (Change):**
```
P2PKH <wallet_address>
Value: input_value - fees - 1
```

### OP_RETURN Data Format

Datos almacenados como JSON UTF-8:
```json
{
  "device_id": "cayapa-001",
  "energy": 5.23,
  "timestamp": 1234567890
}
```

**Script hex:**
```
6a                    // OP_RETURN
4c                    // OP_PUSHDATA1 (si data < 256 bytes)
XX                    // Length
[...data bytes...]    // UTF-8 encoded JSON
```

### Security Model

**Wallet Security:**
- Private key almacenada en `.env` (nunca en código)
- Acceso solo desde backend (no expuesta a frontend)
- KeyDeriver usa identityKey para derivación segura

**API Security:**
- CORS configurado para orígenes específicos
- Validación de datos en cada endpoint
- Rate limiting recomendado para producción

**Blockchain Immutability:**
- Datos no pueden ser modificados después de almacenarse
- Verificación pública vía WhatsOnChain
- Timestamping inmutable en blockchain

## ⚙️ Configuration

### Environment Variables

Crea un archivo `.env` en el directorio `backend/`:

```env
# BSV Wallet Configuration
PRIVATE_KEY=your_backend_wallet_private_key_hex
STORAGE_URL=https://storage.babbage.systems
NETWORK=main
```

**Variables requeridas:**

| Variable | Descripción | Valores | Default |
|----------|-------------|---------|---------|
| `PRIVATE_KEY` | Clave privada hexadecimal de 64 caracteres | hex string | *required* |
| `STORAGE_URL` | URL del sistema de almacenamiento Babbage | URL | `https://storage.babbage.systems` |
| `NETWORK` | Red BSV (mainnet/testnet) | `main` \| `test` | `main` |

### Generar Private Key

Para generar una nueva clave privada segura:

**Método 1 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Método 2 - Usar script de setup:**
```bash
npm run setup
```
Este comando:
1. Genera wallet si no existe `.env`
2. Crea archivo `.env` con configuración
3. Financia wallet con 10,000 satoshis (si tienes wallet local)
4. Muestra identityKey y dirección

**Output esperado:**
```
Created new backend wallet with address: 1ABC...
Payer identity: 02def...
Payee identity: 02abc...
Funding backend wallet with 10000 satoshis...
Transaction created: abc123def456...

✓ Success! Backend wallet funded with 10000 satoshis
✓ Address: 1ABC...
✓ TXID: abc123def456...
✓ https://whatsonchain.com/tx/abc123def456...
```

**⚠️ Seguridad Crítica:**
- ❌ **NUNCA** compartas tu `PRIVATE_KEY`
- ❌ **NUNCA** subas `.env` a control de versiones (Git)
- ✅ Añade `.env` a `.gitignore`
- ✅ Guarda copia de respaldo en lugar seguro (password manager)
- ✅ Para producción, usa variables de entorno del servidor
- ✅ Rota claves periódicamente
- ✅ Asegura que la wallet tenga fondos suficientes (satoshis)

## 🧪 Testing

### Pruebas Manuales con curl

#### 1. Almacenar datos de energía

```bash
curl -X POST http://localhost:3001/api/store-json \
  -H "Content-Type: application/json" \
  -d "{
    \"device_id\": \"cayapa-001\",
    \"energy\": 15.75,
    \"timestamp\": $(date +%s)
  }"
```

**Respuesta esperada:**
```json
{
  "txid": "abc123...",
  "tx_link": "https://whatsonchain.com/tx/abc123..."
}
```

#### 2. Consultar datos almacenados

```bash
curl http://localhost:3001/api/read
```

**Respuesta esperada:**
```json
[
  {
    "device_id": "cayapa-001",
    "energy": 15.75,
    "timestamp": 1701388800,
    "tx_link": "https://whatsonchain.com/tx/..."
  }
]
```

#### 3. Verificar información de la wallet

```bash
curl http://localhost:3001/api/wallet-info
```

**Respuesta esperada:**
```json
{
  "identityKey": "02abc123def456..."
}
```

### Pruebas con Swagger UI

Accede a `http://localhost:3001/api-doc` para probar los endpoints de forma interactiva:

1. Expande un endpoint (ej: `POST /api/store-json`)
2. Click en "Try it out"
3. Modifica el JSON de ejemplo
4. Click en "Execute"
5. Revisa la respuesta y el código de estado

## 🐛 Troubleshooting

### Error "Insufficient funds"

**Problema:** La wallet del backend no tiene satoshis suficientes.

**Solución:**
1. Verifica el balance de la wallet
2. Transfiere satoshis a la dirección de la wallet
3. Configura correctamente el `PRIVATE_KEY` en `.env`

### Error "Invalid timestamp"

**Problema:** El timestamp está en formato incorrecto.

**Solución:**
- Usa timestamp UNIX (segundos desde epoch)
- Ejemplo: `Math.floor(Date.now() / 1000)`

### ESP32 no puede conectar

**Problema:** El dispositivo ESP32 no puede enviar datos.

**Solución:**
1. Verifica que el backend esté en `http://192.168.x.x:3001`
2. Confirma que ESP32 y servidor estén en la misma red
3. Revisa los logs del ESP32 en el monitor serial
4. Desactiva firewall temporalmente para pruebas

### Datos no aparecen en frontend

**Problema:** El frontend no muestra los datos enviados.

**Solución:**
1. Verifica que `solar-data.json` contenga datos
2. Confirma que el backend responda en `/api/read`
3. Revisa la configuración de CORS si es necesario
4. Comprueba la URL del backend en el frontend (`.env`)

## 📊 API Performance

### Límites y Capacidad

| Métrica | Valor | Notas |
|---------|-------|-------|
| Rate Limiting | No implementado | ⚠️ Considerar para producción |
| Max Payload Size | 100 KB | Por request en POST /api/store-json |
| Transaction Timeout | 30 segundos | Por transacción BSV |
| Storage Type | Archivo JSON | ⚠️ Migrar a DB en producción |
| Concurrent Requests | Sin límite | ⚠️ Configurar según servidor |
| Max OP_RETURN Data | ~100 KB | Límite técnico de BSV |
| Cache Size | Ilimitado | `solar-data.json` crece indefinidamente |
| Response Time | < 100ms | GET /api/read (desde cache) |
| Blockchain Confirmation | ~10 segundos | Tiempo de propagación BSV |

### Optimizaciones Implementadas

✅ **Cache Local:**
- Archivo `solar-data.json` para consultas instantáneas
- Evita queries a blockchain en cada lectura
- Prepend de nuevos datos (más recientes primero)

✅ **Respuestas Inmediatas:**
- Retorna TXID sin esperar confirmación
- Almacenamiento en cache simultáneo
- No bloquea ESP32 esperando confirmación

✅ **Validación Preventiva:**
- Valida datos antes de crear transacciones
- Evita gasto de satoshis en datos inválidos
- Mensajes de error descriptivos

✅ **Logs Detallados:**
- Console logs para debugging
- Errores capturados y reportados
- Trazabilidad de transacciones

### Optimizaciones Recomendadas para Producción

🔵 **Database Migration:**
```typescript
// Migrar de JSON a PostgreSQL/MongoDB
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function saveEnergyData(data: EnergyDataStored) {
  await pool.query(
    'INSERT INTO energy_data (device_id, energy, timestamp, tx_link) VALUES ($1, $2, $3, $4)',
    [data.device_id, data.energy, data.timestamp, data.tx_link]
  )
}
```

🔵 **Rate Limiting:**
```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // 100 requests por ventana
})

app.use('/api/store-json', limiter)
```

🔵 **Caching Layer:**
```typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

async function getCachedData(key: string) {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)
  
  const data = await loadFromDB()
  await redis.setex(key, 300, JSON.stringify(data)) // 5 min TTL
  return data
}
```

🔵 **Batch Processing:**
```typescript
// Acumular datos y transmitir en lote
let batch: EnergyData[] = []

function addToBatch(data: EnergyData) {
  batch.push(data)
  if (batch.length >= 10) {
    processBatch(batch)
    batch = []
  }
}
```

### Monitoring Recommendations

📈 **Métricas a trackear:**
- Request rate (requests/segundo)
- Response time (p50, p95, p99)
- Error rate (%)
- Blockchain confirmations (tiempo promedio)
- Wallet balance (satoshis disponibles)
- Storage size (MB de solar-data.json o DB)
- Transaction fees (satoshis por TX)

📈 **Herramientas sugeridas:**
- **New Relic / DataDog**: APM y monitoreo
- **Prometheus + Grafana**: Métricas custom
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **PagerDuty**: Alertas y on-call

## 📚 Resources

### Documentación Oficial
- [BSV SDK Documentation](https://docs.bsvblockchain.org/) - SDK oficial de BSV Blockchain
- [Next.js Documentation](https://nextjs.org/docs) - Framework del backend
- [Swagger/OpenAPI Specification](https://swagger.io/specification/) - Estándar de documentación API
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guía de TypeScript

### Herramientas
- [WhatsOnChain Explorer](https://whatsonchain.com/) - Explorador de blockchain BSV
- [Postman](https://www.postman.com/) - Cliente de prueba de APIs REST
- [Insomnia](https://insomnia.rest/) - Alternativa a Postman

### Comunidad BSV
- [BSV Discord](https://discord.gg/bsv) - Chat de la comunidad
- [BSV GitHub](https://github.com/bsv-blockchain) - Repositorios oficiales
- [BSV Documentation](https://docs.bsvblockchain.org/) - Documentación técnica completa

## 📄 License

[MIT License](LICENSE)

## 🤝 Contributing

Las contribuciones son bienvenidas. Por favor, siéntete libre de enviar un Pull Request.

## 👏 Acknowledgments

Construido con herramientas del ecosistema BSV blockchain. Agradecimientos especiales a la comunidad de desarrollo BSV por su excelente documentación y soporte.

---

## 🔐 Security Considerations

### Implementaciones Actuales

✅ **CORS Protection:**
- Whitelist de orígenes permitidos
- Solo localhost en desarrollo
- Headers configurados correctamente

✅ **Environment Variables:**
- Private key fuera del código
- Configuración mediante `.env`
- `.gitignore` previene commits accidentales

✅ **Input Validation:**
- Validación de tipos en TypeScript
- Verificación de campos requeridos
- Sanitización de datos JSON

✅ **Error Handling:**
- Try-catch en operaciones críticas
- Mensajes de error sin exponer internals
- Logs para debugging

### Recomendaciones para Producción

🔴 **CRÍTICO - Implementar antes de producción:**

#### 1. Rate Limiting
```typescript
import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: 'Too many requests from this IP'
})

app.use('/api/', apiLimiter)
```

#### 2. API Key Authentication
```typescript
function validateApiKey(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = req.headers['x-api-key']
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}
```

#### 3. HTTPS Obligatorio
```typescript
// En producción, rechazar HTTP
if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
  res.redirect(301, `https://${req.headers.host}${req.url}`)
  return
}
```

#### 4. Input Validation Estricta
```typescript
import Joi from 'joi'

const energyDataSchema = Joi.object({
  device_id: Joi.string().pattern(/^[a-z0-9-]+$/).required(),
  energy: Joi.number().min(0).max(1000).required(),
  timestamp: Joi.number().integer().min(0).required()
})

function validateInput(data: unknown) {
  const { error, value } = energyDataSchema.validate(data)
  if (error) throw new Error(`Invalid input: ${error.message}`)
  return value
}
```

#### 5. Database Migration
```typescript
// Migrar de JSON a PostgreSQL
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Solo en Heroku/cloud
})

// Usar prepared statements para prevenir SQL injection
await pool.query(
  'INSERT INTO energy_data (device_id, energy, timestamp, tx_link) VALUES ($1, $2, $3, $4)',
  [device_id, energy, timestamp, tx_link]
)
```

#### 6. Backup System
```bash
#!/bin/bash
# backup.sh - Ejecutar diariamente vía cron

DATE=$(date +%Y%m%d)
pg_dump $DATABASE_URL > "backups/backup-$DATE.sql"
aws s3 cp "backups/backup-$DATE.sql" s3://my-backups/
```

#### 7. Monitoring & Alerting
```typescript
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
})

// Capturar errores críticos
try {
  await processTransaction(data)
} catch (error) {
  Sentry.captureException(error)
  // Enviar alerta a equipo
  await sendSlackAlert(`Transaction failed: ${error.message}`)
}
```

#### 8. Wallet Management
```typescript
// Monitor balance y alertar si está bajo
async function checkWalletBalance() {
  const balance = await wallet.getBalance()
  
  if (balance < 10000) { // < 10k satoshis
    await sendAlert({
      level: 'WARNING',
      message: `Wallet balance low: ${balance} sats`
    })
  }
}

// Ejecutar cada hora
setInterval(checkWalletBalance, 60 * 60 * 1000)
```

### Security Checklist

**Antes de deployment:**

- [ ] ✅ Rate limiting habilitado
- [ ] ✅ API key authentication implementada
- [ ] ✅ HTTPS forzado (SSL/TLS)
- [ ] ✅ Input validation con Joi/Zod
- [ ] ✅ Database (PostgreSQL/MongoDB) en lugar de JSON
- [ ] ✅ Backup automático configurado
- [ ] ✅ Error monitoring (Sentry/Rollbar)
- [ ] ✅ Logging centralizado (Winston/Bunyan)
- [ ] ✅ CORS configurado para dominio específico
- [ ] ✅ Environment variables en servidor (no en `.env` commiteado)
- [ ] ✅ Wallet balance monitoring
- [ ] ✅ DDoS protection (Cloudflare)
- [ ] ✅ Secrets rotation policy
- [ ] ✅ Audit logs para transacciones
- [ ] ✅ Health check endpoint (`/api/health`)

### Incident Response Plan

**Si wallet comprometida:**
1. Detener servidor inmediatamente
2. Generar nueva private key
3. Transferir fondos restantes a nueva wallet
4. Actualizar `.env` con nueva key
5. Investigar logs para determinar punto de compromiso
6. Notificar a usuarios si datos afectados

**Si ataque DDoS:**
1. Activar Cloudflare protection
2. Habilitar rate limiting agresivo
3. Analizar logs para identificar patrón
4. Bloquear IPs maliciosas
5. Escalar recursos temporalmente

**Si datos corruptos:**
1. Restaurar desde último backup
2. Verificar integridad de blockchain (datos inmutables)
3. Comparar backup vs blockchain
4. Reconstruir solar-data.json desde blockchain

---

**Nota:** Este proyecto está diseñado para demostración y educación. Para uso en producción, implementa las medidas de seguridad mencionadas, añade pruebas exhaustivas y considera usar una base de datos en lugar de archivos JSON.

---

## 👥 Equipo Cayapa

Proyecto desarrollado para **[MMERGE Web3 Hackathon 2025](https://www.linkedin.com/company/mmerge)**:

- [Alejandro Sanchez](https://www.linkedin.com/in/alejandrocarracedo/)
- [Álvaro Rubén Hurtado Maldonado](https://www.linkedin.com/in/alvarohurtadobo/), [@alvarohurtadobo](https://github.com/alvarohurtadobo)
- [Victor Bague](https://www.linkedin.com/in/victorbague/), [@VictorBagueUAX](https://github.com/VictorBagueUAX)
- [Manuel Jesús Rojas Villanueva](https://www.linkedin.com/in/manuelrojasvillanueva/), [@texaco](https://github.com/texaco)
- [Leonardo J. Caballero G.](https://www.linkedin.com/in/leonardojcaballerog/), [@macagua](https://github.com/macagua)

<img src="../docs/mmerge_web3_hackathon_2025.jpeg" alt="MMERGE Web3 Hackathon 2025" width="800" height="450">

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](./LICENSE.md).
