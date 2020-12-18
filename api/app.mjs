/* import { importData } from './dataImporter.mjs' */
import peopleRouter from './routes/peopleRouter.mjs'
import planetRouter from './routes/planetRouter.mjs'
import speciesRouter from './routes/speciesRouter.mjs'
import movieRouter from './routes/movieRouter.mjs'
import funFactRouter from './routes/funFactRouter.mjs'

// No, danger.
/* importData() */

import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/people', peopleRouter)
app.use('/planet', planetRouter)
app.use('/species', speciesRouter)
app.use('/movie', movieRouter)
app.use('/fun_fact', funFactRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
