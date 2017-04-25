'use strict'

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
    'NET': DataTypes.DECIMAL(10, 2),
    'Gross': DataTypes.DECIMAL(10, 2),
    'Tax': DataTypes.DECIMAL(10, 2),
    'Super': DataTypes.DECIMAL(10, 2),
    'Pay': DataTypes.DECIMAL(10, 2)
  })
  return Payslip
}
