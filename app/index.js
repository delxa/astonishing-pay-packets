import express from 'express'
import bodyParser from 'body-parser'

import { router as ApiRouter } from './server/routers/api'
import models from './server/models'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

let app = express()

app.set('json spaces', 2)

app.use(bodyParser.json())
app.use('/api', ApiRouter)

const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// Ordinarily, one would use Pug/Jade to render views but seems crazy to add it in to handle a single view.
app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Super Awesome Payslips of Awesomeness</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <div id="app"></div>
            </div>
          </div>
        </div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `)
})

// Oh no you don't.
app.get('/*', (req, res) => {
  res.redirect('/')
})

// Prep DB and prepare to listen on Port
models.sequelize.sync()
  .then(result => {
    app.listen(3000)
    console.log(`Minding your own business on Port 3000`)
  })
