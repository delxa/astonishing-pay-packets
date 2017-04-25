import express from 'express'
import { router as ApiRouter } from './server/routers/api'

let app = express()

app.use('/api', ApiRouter)

app.listen(3000)
console.log(`Minding your own business on Port 3000`)
