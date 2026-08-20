import express from 'express'
import { getPlacementRoadmap } from '../controllers/geminiController.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { aiSchemas } from '../utils/validators.js'

const router = express.Router()

/**
 * @swagger
 * /api/placements:
 *   post:
 *     summary: Generate an AI-powered placement preparation roadmap
 *     tags: [AI Features]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlacementRoadmapRequest'
 *     responses:
 *       200:
 *         description: AI-generated 3-month placement roadmap
 *       400:
 *         description: Validation error (company name required)
 *       500:
 *         description: AI processing failed
 */
router.post('/', validateRequest(aiSchemas.getRoadmap), async (req, res, next) => {
  try {
    const { company, role, currentSkills, language } = req.body

    const result = await getPlacementRoadmap(company, role, currentSkills, language)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router
