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
│       └── wallet-info.ts     # GET - Información de la wallet BSV
├── src/
│   ├── wallet.ts              # Inicialización y configuración de wallet BSV
│   ├── setupWallet.ts         # Script de configuración inicial de wallet
│   └── types.ts               # Definiciones de tipos TypeScript
├── lib/
│   └── storage.ts             # Almacenamiento JSON local (solar-data.json)
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
| `GET` | `/api-doc` | Documentación Swagger | Interfaz interactiva API |

## 🔍 How it Works

### Data Storage Flow

1. **ESP32 Device** envía datos de energía solar vía HTTP POST
2. **API Endpoint** (`/api/store-json`) recibe los datos
3. **BSV Transaction** se crea con datos en OP_RETURN
4. **Blockchain Storage** - Transacción se firma y transmite a BSV blockchain
5. **Local Cache** - Datos se guardan en `solar-data.json` para consultas rápidas
6. **Enlace TX** - Se retorna enlace a WhatsOnChain para verificación

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
```

**Variables requeridas:**
- `PRIVATE_KEY`: Clave privada hexadecimal de 64 caracteres para la wallet BSV
- `BSV_NETWORK`: Red BSV (`mainnet` para producción, `testnet` para pruebas)

### Generar Private Key

Para generar una nueva clave privada segura:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**⚠️ Importante:**
- Nunca compartas tu `PRIVATE_KEY`
- Guarda una copia de respaldo en un lugar seguro
- Para producción, asegura que la wallet tenga fondos suficientes (satoshis)

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

- **Rate Limiting**: No implementado (considera añadir en producción)
- **Tamaño máximo de payload**: 100KB por request
- **Timeout**: 30 segundos por transacción BSV
- **Almacenamiento**: Archivo JSON local (considera base de datos para producción)

### Optimizaciones

- Cache local en `solar-data.json` para consultas rápidas
- Respuestas inmediatas después de transmitir a blockchain
- Validación de datos antes de crear transacciones
- Logs detallados para debugging

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

Para uso en producción, considera implementar:

- ✅ **Rate Limiting** - Prevenir abuso de la API
- ✅ **API Key Authentication** - Autenticación para endpoints sensibles
- ✅ **Input Validation** - Validación estricta de todos los inputs
- ✅ **HTTPS** - Certificado SSL/TLS obligatorio
- ✅ **Database** - Migrar de JSON a PostgreSQL/MongoDB
- ✅ **Error Handling** - Manejo robusto de errores y logging
- ✅ **Backup System** - Respaldos automáticos de datos
- ✅ **Monitoring** - Alertas y monitoreo en tiempo real

---

**Nota:** Este proyecto está diseñado para demostración y educación. Para uso en producción, implementa las medidas de seguridad mencionadas, añade pruebas exhaustivas y considera usar una base de datos en lugar de archivos JSON.
