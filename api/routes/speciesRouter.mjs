import express from 'express'

import speciesController from '../controller/speciesController.mjs'

const router = express.Router()

router.get('/', speciesController.index)
router.get('/:name', speciesController.show)

export default router