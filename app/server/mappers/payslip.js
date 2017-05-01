import omapper from 'o-mapper'

const schema = {
  'Firstname': { key: 'firstname' },
  'Surname': { key: 'surname' },
  'PaymentDate': { key: 'date' },
  'Frequency': { key: 'frequency' },
  'Salary': { key: 'salary' },
  'Net': { key: 'net' },
  'Gross': { key: 'gross' },
  'Tax': { key: 'incomeTax' },
  'Super': { key: 'contribution' },
  'Pay': { key: 'pay' }
}

export function mapper (input) {
  return omapper(input, schema)
}
