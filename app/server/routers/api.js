import express from 'express'
import RateTables from '../../../data/atotaxrates.json'

import models from '../models'
import ATOPayCalculator from '../../common/modules/ATOPayCalculator'

const router = express.Router()

/**
  * ROUTES
**/

router.get('/payslips/generate/:taxyear/:salary', (req, res) => {
  let taxyear = req.params.taxyear.replace('-', '/')
  if (RateTables.hasOwnProperty(taxyear)) {
    let calc = new ATOPayCalculator(RateTables[taxyear])
    res.json(calc.getPayslip(parseInt(req.params.salary)))
  } else {
    res.json({success: false, message: 'No Tax Table available for the specified years'})
  }
})

// Get the tax table for a specific year
router.get('/tables/:taxyear', (req, res) => {
  let taxyear = req.params.taxyear.replace('-', '/')
  if (RateTables.hasOwnProperty(taxyear)) {
    res.json(RateTables[taxyear])
  } else {
    res.json({success: false, message: 'No Tax Table available for the specified years'})
  }
})

// Add a payslip to the DB, but only if one doesn't exist for the period
// Too much logic in this router.
router.post('/payslips', (req, res) => {
  // For simplicity, just going to assume that if a payment doesn't exist for the user matching names for this calendar month,
  // then this we can go ahead and create

  // Sort date range.
  let date = new Date()

  models.Payslip.findOne({
    where: {
      Firstname: req.body.Firstname,
      Surname: req.body.Surname,
      PaymentDate: {
        $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        $gt: new Date(date.getFullYear(), date.getMonth(), 1)
      }
    }
  })
    .then(result => {
      if (result) {  // Might need to determine the actual no results logic here.
        return res.json({success: false, type: 'EXISTS', message: 'There is an existing payslip for this User and Pay Period.'})
      }

      // Otherwise, continue
      models.Payslip.create(Object.assign({}, req.body, {PaymentDate: Date.now()}))
        .then(
          result => res.json({success: true, message: 'Created the new payslip in the database.'}),
          err => res.json({success: false, message: 'Unable to create the payslip.', reason: err})
        )
    })
})

export { router }
