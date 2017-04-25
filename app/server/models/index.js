'use strict'

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

let db = {}

// Spin up sequelize to run with a local Sqlite instance
// If we want to, we can swap this out later for an external MySQL, PostgreSQL or other relational DB without massively changing the interfaces.
let sequelize = new Sequelize('psdb', '', '', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: './database.sqlite'
})

// This little bit of JS-fu loads each of the models in this folder and carries out any bootstrapping actions required.
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

// We don't have any associate methods defined as we are really just storing payslips.
Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
