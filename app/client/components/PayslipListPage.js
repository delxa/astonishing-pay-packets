import React from 'react'
import Numeral from 'numeral'
import Moment from 'moment'

import { fetchPayslips } from '../sources'

// Helper to quickly currency format a value
let toCurrency = (value) => {
  return Numeral(value).format('$0,0.00')
}

class PayslipListPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      payslips: [],
      error: false,
      success: false
    }

    this.startOver = this.startOver.bind(this)
    this.getPayslips()
  }

  // Submit a payslip via Fetch
  getPayslips () {
    fetchPayslips()
      .then(payslips => this.setState({ payslips }))
      .catch(err => console.log(err))
  }

  startOver () {
    this.props.history.push('/')
  }

  render () {
    return (
      <div className='page'>
        <h1 className='page-header'>Existing Payslips</h1>
        { this.state.error && <div className='alert alert-danger'>Could not retrieve Payslips from the server.</div> }
        <div className='myob-payslip-list'>

          { this.state.payslips.length > 0 &&
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pay Date</th>
                  <th>Gross</th>
                  <th>Super</th>
                  <th>Tax</th>
                  <th>Pay</th>
                </tr>
              </thead>
              <tbody>
                {this.state.payslips.map(payslip =>
                  <tr key={payslip.uuid}>
                    <th>{payslip.Firstname} {payslip.Surname}</th>
                    <td>{Moment(payslip.date).format('MMMM Do YYYY')}</td>
                    <td>{toCurrency(payslip.Gross)}</td>
                    <td>{toCurrency(payslip.Super)}</td>
                    <td>{toCurrency(payslip.Tax)}</td>
                    <td>{toCurrency(payslip.Pay)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          }
          { this.state.payslips.length === 0 && <div className='alert alert-info'>No payslips stored just yet</div> }
        </div>
        <div className='text-right'>
          <button className='btn btn-primary' onClick={this.startOver}>Create Payslip</button>
        </div>
      </div>
    )
  }
}

export default PayslipListPage
