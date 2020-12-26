import peopleRouter from './routes/peopleRouter.mjs'
import planetRouter from './routes/planetRouter.mjs'
import speciesRouter from './routes/speciesRouter.mjs'
import movieRouter from './routes/movieRouter.mjs'
import funFactRouter from './routes/funFactRouter.mjs'

import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000

const corsOptions = {
	origin: 'http://localhost:8100',
	optionsSuccessStatus: 200,
	credentials: true
}

app.use(cors(corsOptions))

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
