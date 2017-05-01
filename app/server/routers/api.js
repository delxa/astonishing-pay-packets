import express from 'express'
import RateTables from '../../../data/atotaxrates.json'

import models from '../models'
import { mapper as payslipMapper } from '../mappers/payslip'

const router = express.Router()

/**
  * ROUTES
**/

// Helper function that keeps the routes themselves nice and thin
var getTaxYearResponse = (taxyear, req, res) => {
  if (RateTables.hasOwnProperty(taxyear)) {
    res.json(RateTables[taxyear])
  } else {
    res.status(404).json({success: false, message: 'No Tax Table available for the specified years'})
  }
}

// Get the current tax year. Calculated dynamically dependent on date
router.get('/tables/current', (req, res) => {
  let date = new Date()
  let year = date.getFullYear()
  let taxyear = (date.getMonth() > 6)
    ? `${year}/${year + 1}`
    : `${year - 1}/${year}`
  getTaxYearResponse(taxyear, req, res)
})

// Get the tax table for a specific year
router.get('/tables/:taxyear', (req, res) => {
  getTaxYearResponse(req.params.taxyear.replace('-', '/'), req, res)
})

// Add a payslip to the DB, but only if one doesn't exist for the period
router.post('/payslips', (req, res) => {
  models.Payslip.createPayslip(payslipMapper(req.body))
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err))
})

router.get('/payslips', (req, res) => {
  models.Payslip.findAll()
    .then(result => {
      res.json(result)
    })
})

export { router }
