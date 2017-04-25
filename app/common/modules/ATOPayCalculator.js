
const DEFAULT_OPTIONS = {
  rounding: true,
  super: 0.09
}

const FREQUENCY_MONTHLY = 'monthly'
const FREQUENCY_FORTNIGHTLY = 'fortnightly'
const FREQUENCY_WEEKLY = 'weekly'

/**  class for calculating salary based on the Rate Tables provided from the ATO. */
export default class ATOPayCalculator {

  /**
   * Create the PayCalculator
   * @param {Object} rateTable - The ATO-provided Rate Table for the tax year.
   */
  constructor (rateTable, options = {}) {
    if (!rateTable) {
      throw new Error('Must be instantiated with a Rate Table')
    }
    this.rateTable = rateTable
    this.options = Object.assign({}, options, DEFAULT_OPTIONS) // Check this works appropriately
  }

  /**
   * Generate the Payslip based on Salary, Super Contribution rate and frequency.
   * @param {int} salary - The Annual Salary in Whole Dollars.
   * @param {float} superPercent - Super Contribution rate to use.
   * @param {string} superPercent - The frequency to use, 'monthly', 'weekly' or 'fortnightly'
   * @returns {Object} An object describing the payslip details.
   */
  getPayslip (salary, superPercent = 0.09, frequency = FREQUENCY_MONTHLY) {
    // Get values from helpers
    let annualTax = this._getTaxForIncome(salary)
    let divider = this._getFrequencyDivider(frequency)

    // Calculations
    let gross = Math.round(salary / divider)
    let incomeTax = Math.round(annualTax / divider)
    let net = gross - incomeTax
    let contribution = Math.round(gross * superPercent)
    let pay = net - contribution

    // Return the Payslip Object
    return {
      date: Date.now(),
      frequency,
      salary,
      gross,
      net,
      incomeTax,
      contribution,
      pay
    }
  }

  // Return the appropriate tax bracket for the given income
  _getTaxForIncome (salary) {
    // Reduce is a nice way to do this because it iterates the set of brackets and returns the most appropriate bracket,
    let bracket = this.rateTable.brackets.reduce((a, c) => {
      let lower = c.lower || 0
      let upper = c.upper || Infinity
      return (salary <= upper && salary >= lower) ? c : a
    })

    // Work out the tax payable
    let flatrate = bracket.flat || 0

    if (!bracket.over) {
      return flatrate
    }

    let lower = (bracket.lower && bracket.lower > 0) ? bracket.lower - 1 : 0

    return (flatrate + (salary - lower) * bracket.over)
  }

  // Get the divider number
  // Surely, there ought to be a more succinct way to write this.
  _getFrequencyDivider (frequency) {
    let divider = 0
    switch (frequency) {
      case FREQUENCY_MONTHLY:
        divider = 12
        break

      case FREQUENCY_FORTNIGHTLY:
        divider = 26
        break

      case FREQUENCY_WEEKLY:
        divider = 52
        break
    }
    return divider
  }

}
