import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import React from 'react'
import EmployeePage from './EmployeeInfoPage'
import PayslipPage from './PayslipPage'
import PayslipListPage from './PayslipListPage'

import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

const Root = () => (
  <Router history={history}>
    <div>
      <Route exact path='/' component={EmployeePage} />
      <Route path='/payslip' component={PayslipPage} />
      <Route path='/list' component={PayslipListPage} />
    </div>
  </Router>
)

export default Root
