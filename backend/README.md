# Cayapa Solar API - Backend

Backend API para el sistema de monitoreo de energía solar con tecnología BSV Blockchain.

## 🌐 Documentación de la API

Al iniciar el servidor, accede a:
- **Raíz**: `http://localhost:3001/` - Redirecciona automáticamente a la documentación
- **Documentación Swagger**: `http://localhost:3001/api-doc` - Interfaz interactiva de la API

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

### Wallet & Status

#### `GET /api/wallet-info`
Obtiene la clave pública de identidad de la wallet del backend.

**Respuesta:**
```json
{
  "identityKey": "02abc123..."
}
```

## ✨ Features

- 🌞 **Monitoreo Solar** - Almacenamiento de datos de energía solar en tiempo real
- ⛓️ **BSV Blockchain** - Datos inmutables almacenados en la blockchain
- 📡 **IoT Integration** - Recepción de datos desde dispositivos ESP32
- 🔐 **OP_RETURN** - Almacenamiento eficiente de datos en transacciones BSV
- ⚡ **API REST** - Endpoints documentados con Swagger/OpenAPI
- 📊 **Real-time Data** - Acceso instantáneo a métricas de energía

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

### Información de la Wallet

```bash
GET http://localhost:3001/api/wallet-info
```

**Respuesta:**
```json
{
  "identityKey": "02abc123..."
}
```

## 📂 Project Structure

```
backend/
├── pages/
│   ├── index.tsx              # Página principal (redirige a /api-doc)
│   ├── api-doc.tsx            # Documentación Swagger UI
│   ├── tokens.tsx             # Página de visualización de tokens (legacy)
│   ├── _app.tsx               # Next.js app wrapper
│   └── api/
│       ├── read.ts            # GET - Obtiene datos de energía almacenados
│       ├── store-json.ts      # POST - Almacena datos en blockchain
│       ├── wallet-info.ts     # GET - Información de la wallet
│       ├── invest.ts          # POST - Endpoint de inversión (legacy, no usado)
│       └── complete.ts        # POST - Completar campaña (legacy, no usado)
├── src/
│   ├── wallet.ts              # Inicialización de wallet BSV
│   ├── setupWallet.ts         # Script de configuración de wallet
│   └── types.ts               # Definiciones de tipos TypeScript
├── lib/
│   ├── storage.ts             # Almacenamiento JSON local (solar-data.json)
│   ├── crowdfunding.ts        # Estado de crowdfunding (legacy, no usado)
│   ├── middleware.ts          # Middleware de pagos BSV (legacy)
│   └── wallet.ts              # Utilities de wallet (legacy)
├── styles/                    # CSS styling
├── solar-data.json            # Datos de energía almacenados localmente
├── package.json               # Dependencias y scripts
└── next.config.js             # Configuración Next.js
```

## 🔍 How it Works

### Data Storage Flow

1. **ESP32 Device** envía datos de energía solar vía HTTP POST
2. **API Endpoint** (`/api/store-json`) recibe los datos
3. **BSV Transaction** se crea con datos en OP_RETURN
4. **Blockchain Storage** - Transacción se firma y transmite a BSV blockchain
5. **Local Cache** - Datos se guardan en `solar-data.json` para consultas rápidas
6. **TX Link** - Se retorna enlace a WhatsOnChain para verificación

### Data Flow Diagram

```
ESP32 → POST /api/store-json → BSV Wallet → Blockchain
                ↓
        solar-data.json (cache)
                ↓
        GET /api/read → Frontend
```

## ⚙️ Configuration

### Environment Variables

Crea un archivo `.env` en el directorio `backend/`:

```env
# BSV Wallet Configuration
PRIVATE_KEY=your_backend_wallet_private_key_hex
BSV_NETWORK=mainnet

# Optional
STORAGE_URL=https://storage.babbage.systems
```

### Generar Private Key

Para generar una nueva clave privada:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🧪 Testing

### Prueba Manual con curl

Enviar datos de energía solar:

```bash
curl -X POST http://localhost:3001/api/store-json \
  -H "Content-Type: application/json" \
  -d "{
    \"device_id\": \"cayapa-001\",
    \"energy\": 15.75,
    \"timestamp\": $(date +%s)
  }"
```

Consultar datos almacenados:

```bash
curl http://localhost:3001/api/read
```

Información de la wallet:

```bash
curl http://localhost:3001/api/wallet-info
```

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

## 📚 Resources

### Documentación
- [BSV SDK Documentation](https://docs.bsvblockchain.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)

### Tools
- [WhatsOnChain Explorer](https://whatsonchain.com/) - Explorador de blockchain BSV
- [Postman](https://www.postman.com/) - Testing de APIs

### Community
- [BSV Discord](https://discord.gg/bsv)
- [BSV GitHub](https://github.com/bsv-blockchain)

## 📄 License

[MIT License](LICENSE)

## 🤝 Contributing

Las contribuciones son bienvenidas. Por favor, siéntete libre de enviar un Pull Request.

## 👏 Acknowledgments

Construido con herramientas del ecosistema BSV blockchain. Agradecimientos especiales a la comunidad de desarrollo BSV por su excelente documentación y soporte.

---

**Nota:** Este proyecto está diseñado para demostración y educación. Para uso en producción, añade manejo de errores robusto, medidas de seguridad, almacenamiento en base de datos y pruebas exhaustivas.
