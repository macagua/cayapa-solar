import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Configura los headers CORS para permitir solicitudes desde el frontend
 * @param req Request object
 * @param res Response object
 * @returns true si es una solicitud OPTIONS (preflight), false en caso contrario
 */
export function setCorsHeaders(req: NextApiRequest, res: NextApiResponse): boolean {
  const origin = req.headers.origin

  // Permitir localhost:3000 (frontend) y otros orígenes en desarrollo
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173', // Vite default port
    'http://127.0.0.1:5173',
  ]

  // Si el origen está en la lista permitida, usarlo; de lo contrario, usar el origen de la solicitud
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else if (origin && process.env.NODE_ENV === 'development') {
    // En desarrollo, permitir cualquier origen localhost
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-BSV-Payment')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Max-Age', '86400') // 24 horas

  // Manejar solicitudes preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return true
  }

  return false
}

