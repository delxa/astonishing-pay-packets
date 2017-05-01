import React from 'react'
import Numeral from 'numeral'
import Moment from 'moment'

import { fetchSubmitPayslip } from '../sources'

// Helper to quickly currency format a value
let toCurrency = (value) => {
  return Numeral(value).format('$0,0.00')
}

class PayslipPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      payslip: props.location.state,
      name: `${props.location.state.firstname} ${props.location.state.surname}`,
      error: false,
      success: false
    }

    this.submit = this.submit.bind(this)
    this.startOver = this.startOver.bind(this)
  }

  // Submit a payslip via Fetch
  submit () {
    fetchSubmitPayslip(this.state.payslip)
      .then(result => this.setState({success: true}))
      .catch(err => this.setState({error: true}))
  }

  startOver () {
    this.props.history.push('/')
  }

  render () {
    return (
      <div className='page'>
        <h1 className='page-header'>Payslip</h1>
        <h2>{this.state.name}</h2>

        { this.state.success && <div className='alert alert-success'>Successfully submitted payslip for <strong>{this.state.name}</strong>.</div> }
        { this.state.error && <div className='alert alert-danger'>You have already generated a payslip for <strong>{this.state.name}</strong> for this month.</div> }

        <div className='myob-payslip-summary'>
          <table className='table table-striped'>
            <tbody>
              <tr>
                <th>Pay Date</th>
                <td>{Moment(this.state.payslip.date).format('MMMM Do YYYY')}</td>
              </tr>
              <tr>
                <th>Pay Frequency</th>
                <td>{this.state.payslip.frequency}</td>
              </tr>
              <tr>
                <th>Annual Income</th>
                <td>{toCurrency(this.state.payslip.salary)}</td>
              </tr>
              <tr>
                <th>Gross Income</th>
                <td>{toCurrency(this.state.payslip.gross)}</td>
              </tr>
              <tr>
                <th>Income Tax</th>
                <td>{toCurrency(this.state.payslip.incomeTax)}</td>
              </tr>
              <tr>
                <th>Net Income</th>
                <td>{toCurrency(this.state.payslip.net)}</td>
              </tr>
              <tr>
                <th>Super</th>
                <td>{toCurrency(this.state.payslip.contribution)}</td>
              </tr>
              <tr>
                <th>Pay</th>
                <td>{toCurrency(this.state.payslip.pay)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='myob-navigation text-right'>
          { (this.state.success || this.state.error) && <button className='btn btn-success' onClick={this.startOver}>Start over</button> }
          { !this.state.success && !this.state.error && <button className='btn btn-primary' onClick={this.submit}>Pay</button> }
        </div>
      </div>
    )
  }
}

export default PayslipPage
