import type { NextApiRequest, NextApiResponse } from 'next'
import { wallet } from '../../src/wallet'
import { setCorsHeaders } from '../../lib/cors'

/**
 * @swagger
 * /api/wallet-info:
 *   get:
 *     summary: Get wallet identity key
 *     tags: [Wallet]
 *     description: Obtiene la clave de identidad pública de la wallet BSV del backend
 *     responses:
 *       200:
 *         description: Información de la wallet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 identityKey:
 *                   type: string
 *                   description: Clave pública de identidad de la wallet
 *       500:
 *         description: Error del servidor
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configurar CORS
  if (setCorsHeaders(req, res)) {
    return // Respuesta preflight ya enviada
  }

  const identityKey = await wallet.getPublicKey({ identityKey: true })

  res.status(200).json({ identityKey: identityKey.publicKey })
}
