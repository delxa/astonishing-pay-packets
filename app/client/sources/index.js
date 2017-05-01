import fetch from 'isomorphic-fetch'

// Get tax rate table
export function fetchYearRates (taxyear = 'current') {
  return new Promise((resolve, reject) => {
    return fetch(`/api/tables/${taxyear}`)
      .then(response => {
        if (response.status === 200) {
          response.json().then(json => {
            resolve(json)
          })
        } else {
          reject(response)
        }
      })
  })
}

// Submit a payslip via Fetch
export function fetchSubmitPayslip (payslip) {
  return new Promise((resolve, reject) => {
    return fetch('/api/payslips', {
      method: 'POST',
      body: JSON.stringify(payslip),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
  })
}

// Get payslips via the api
export function fetchPayslips () {
  return new Promise((resolve, reject) => {
    return fetch('/api/payslips')
      .then(response => {
        if (response.status === 200) {
          response.json()
            .then(json => {
              resolve(json)
            })
        } else {
          reject(response)
        }
      })
  })
}
