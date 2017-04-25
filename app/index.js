import express from 'express'
import bodyParser from 'body-parser'

import { router as ApiRouter } from './server/routers/api'
import models from './server/models'

let app = express()

app.set('json spaces', 2)

app.use(bodyParser.json())
app.use('/api', ApiRouter)

// Prep DB and prepare to listen on Port
models.sequelize.sync()
  .then(result => {
    app.listen(3000)
    console.log(`Minding your own business on Port 3000`)
  })
