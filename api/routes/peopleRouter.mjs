import express from 'express'

import peopleController from '../controller/peopleController.mjs'

const router = express.Router()

console.log("in router")
router.get('/', peopleController.index)
router.get('/:name', peopleController.show) // people/anakin
/* router.get('/species/:species', peopleController.show) */ // people/species/hutt

export default router