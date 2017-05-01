import React from 'react'

import { fetchYearRates } from '../sources'

import ATOPayCalculator from '../../common/modules/ATOPayCalculator'

class EmployeeInfoPage extends React.Component {

  constructor (props) {
    super(props)

    // Initial State
    this.state = {
      Firstname: false,
      Surname: false,
      Salary: 0,
      ContributionRate: 0,
      error: false
    }

    // Bind Functions
    this.navigateExisting = this.navigateExisting.bind(this)
    this.generatePayslipAndGo = this.generatePayslipAndGo.bind(this)
    this.updateEmployeeDetails = this.updateEmployeeDetails.bind(this)

    // Retrieve the Year Rates from the Server
    this.getYearRates()
  }

  // Get the tax table for the current year (worked out on server)
  getYearRates () {
    fetchYearRates()
      .then(table => this.setState({ratetable: table}))
      .catch(err => console.log(err))
  }

  // Generate payslip and navigate to next screen
  generatePayslipAndGo () {
    // Field completion
    if (!this.state.Firstname || !this.state.Surname || !this.state.Salary || !this.state.ContributionRate) {
      this.setState({error: {
        message: 'You must complete all fields to generate a Payslip.',
        errorType: 'INCOMPLETE'
      }})
      return
    }

    // Non-numeric values
    if (isNaN(this.state.Salary) || isNaN(this.state.ContributionRate)) {
      this.setState({error: {
        message: 'Annual Salary and Super Rate require numeric input.',
        errorType: 'NON_NUMERIC'
      }})
      return
    }

    // Super greater than 100%
    if (parseInt(this.state.ContributionRate) > 100) {
      this.setState({error: {
        message: 'Super Rate cannot exceed 100%.',
        errorType: 'SUPER_EXCESS'
      }})
      return
    }

    // Calculate
    var calc = new ATOPayCalculator(this.state.ratetable)
    var payslip = calc.getPayslip(parseInt(this.state.Salary), parseInt(this.state.ContributionRate) / 100)

    // Assign State
    payslip = {
      ...payslip,
      firstname: this.state.Firstname,
      surname: this.state.Surname
    }

    // Navigate
    this.props.history.push('/payslip', payslip)
  }

  // Trigger router to view a list of existing Payslips
  navigateExisting () {
    this.props.history.push('/list')
  }

  // Update employee details from form
  updateEmployeeDetails (item, value) {
    this.setState({
      [item]: value
    })
  }

  render () {
    return (
      <div className='page'>
        <h1 className='page-header'>Employee Info</h1>

        { this.state.error && <div className='alert alert-danger' key='error'>{this.state.error.message}</div>}

        <div className='row'>
          <div className='col-sm-6 form-group'>
            <input className='form-control' type='text' placeholder='First Name' onChange={(e) => this.updateEmployeeDetails('Firstname', e.target.value)} />
          </div>
          <div className='col-sm-6 form-group'>
            <input className='form-control' type='text' placeholder='Surname' onChange={(e) => this.updateEmployeeDetails('Surname', e.target.value)} />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 form-group'>
            <div className='input-group'>
              <span className='input-group-addon'>$</span>
              <input type='tel' className='form-control' placeholder='Annual Salary' onChange={(e) => this.updateEmployeeDetails('Salary', e.target.value)} />
              <span className='input-group-addon'>.00</span>
            </div>
          </div>
          <div className='col-sm-6 form-group'>
            <div className='input-group input'>
              <input type='tel' className='form-control' placeholder='Super Rate' onChange={(e) => this.updateEmployeeDetails('ContributionRate', e.target.value)} />
              <span className='input-group-addon'>%</span>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 form-group'>
            <a className='btn btn-link' onClick={this.navigateExisting}>View Existing</a>
            <button className='btn btn-primary pull-right' onClick={this.generatePayslipAndGo}>Generate Payslip</button>
          </div>
        </div>
      </div>
    )
  }

}

export default EmployeeInfoPage
