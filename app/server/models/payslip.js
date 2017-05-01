'use strict'
import Moment from 'moment'

export default (sequelize, DataTypes) => {
  let Payslip = sequelize.define('Payslip', {
    'uuid': {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    'PaymentDate': DataTypes.DATE,
    'Firstname': DataTypes.TEXT,
    'Surname': DataTypes.TEXT,
    'Frequency': DataTypes.TEXT,
    'Salary': DataTypes.DECIMAL(10, 2),
    'Net': DataTypes.DECIMAL(10, 2),
    'Gross': DataTypes.DECIMAL(10, 2),
    'Tax': DataTypes.DECIMAL(10, 2),
    'Super': DataTypes.DECIMAL(10, 2),
    'Pay': DataTypes.DECIMAL(10, 2)
  }, {
    classMethods: {
      // This custom create method looks to see if there is a matching payslip before creating.
      // Assumption: Enough to simply check for record matching the First Name and Surname for the current calendar month.
      createPayslip: (payload) => {
        return new Promise((resolve, reject) => {
          let to = Moment(payload.PaymentDate).endOf('month')
          let from = Moment(payload.PaymentDate).startOf('month')

          Payslip.findOne({
            where: {
              Firstname: payload.Firstname,
              Surname: payload.Surname,
              createdAt: {
                $lt: to,
                $gt: from
              }
            }
          })
          .then(result => {
            if (result) {
              reject({success: false, type: 'EXISTS', message: 'There is an existing payslip for this User and Pay Period.'})
            } else {
              // Otherwise, continue
              Payslip.create(Object.assign({}, payload, {PaymentDate: Date.now()}))
                .then(
                  result => resolve({success: true, message: 'Created the new payslip in the database.'}),
                  err => reject({success: false, message: 'Unable to create the payslip.', reason: err})
                )
            }
          })
        })
      }
    }
  })
  return Payslip
}
