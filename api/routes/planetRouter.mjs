import express from 'express'

import planetController from '../controller/planetController.mjs'

const router = express.Router()

router.get('/', planetController.index)
router.get('/:name', planetController.show)

export default router