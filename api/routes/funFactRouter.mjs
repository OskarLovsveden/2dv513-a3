import express from 'express'

import funFactController from '../controller/funFactController.mjs'

const router = express.Router()

router.get('/', funFactController.index)

export default router