import express from 'express'

import planetController from '../controller/planetController.mjs'

const router = express.Router()

router.get('/', planetController.index)

export default router