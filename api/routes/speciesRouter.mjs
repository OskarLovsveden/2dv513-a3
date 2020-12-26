import express from 'express'

import speciesController from '../controller/speciesController.mjs'

const router = express.Router()

router.get('/', speciesController.index)

export default router