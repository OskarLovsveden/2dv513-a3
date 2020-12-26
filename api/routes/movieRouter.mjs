import express from 'express'

import movieController from '../controller/movieController.mjs'

const router = express.Router()

router.get('/', movieController.index)

export default router