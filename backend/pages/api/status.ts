import type { NextApiRequest, NextApiResponse } from 'next'
import { crowdfunding, setCrowdfundingState } from '../../lib/crowdfunding'
import { wallet } from '../../src/wallet'
import { loadCrowdfundingData } from '../../lib/storage'

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Get crowdfunding campaign status
 *     tags: [Status]
 *     description: Obtiene el estado actual de la campaña de crowdfunding
 *     responses:
 *       200:
 *         description: Estado de la campaña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 goal:
 *                   type: number
 *                   description: Meta de recaudación en satoshis
 *                 raised:
 *                   type: number
 *                   description: Cantidad recaudada en satoshis
 *                 investorCount:
 *                   type: integer
 *                   description: Número de inversores
 *                 isComplete:
 *                   type: boolean
 *                   description: Si la campaña está completa
 *                 completionTxid:
 *                   type: string
 *                   description: ID de transacción de finalización
 *                 percentFunded:
 *                   type: integer
 *                   description: Porcentaje financiado
 *                 investors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       identityKey:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       timestamp:
 *                         type: integer
 *       500:
 *         description: Error del servidor
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Load crowdfunding state
    try {
      const identityKey = await wallet.getPublicKey({ identityKey: true })

      // Load crowdfunding state for this wallet
      const loadedState = loadCrowdfundingData(identityKey.publicKey)
      setCrowdfundingState(loadedState)
    } catch (loadError) {
      console.error('Could not load wallet state:', loadError)
    }

    res.status(200).json({
      goal: crowdfunding.goal,
      raised: crowdfunding.raised,
      investorCount: crowdfunding.investors.length,
      isComplete: crowdfunding.isComplete,
      completionTxid: crowdfunding.completionTxid,
      percentFunded: Math.round((crowdfunding.raised / crowdfunding.goal) * 100),
      investors: crowdfunding.investors.map(inv => ({
        identityKey: inv.identityKey.slice(0, 16) + '...',
        amount: inv.amount,
        timestamp: inv.timestamp
      }))
    })
  } catch (error: any) {
    console.error('Status error:', error)
    res.status(500).json({ error: error.message || 'Failed to get status' })
  }
}
