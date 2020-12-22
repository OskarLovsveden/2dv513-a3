import express from 'express'

import peopleController from '../controller/peopleController.mjs'

const router = express.Router()

router.get('/', peopleController.index)
router.get('/:name', peopleController.show)

export default router