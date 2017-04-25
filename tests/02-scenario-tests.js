require('babel-register')
var vows = require('vows')
var assert = require('assert')

// Because the rest of
var ATOPayCalculator = require('../app/common/modules/ATOPayCalculator').default // Default is used because ATOPayCalculator is an ES6 class.
var RateTable = require('../data/atotaxrates.json')

vows.describe('02 Specific Scenario Tests')
  .addBatch({

    // Test scenarios
    '01 GIVEN I instance ATOPayCalculator with 2012/2013 Tax Year Rate Table, ': {
      topic: new ATOPayCalculator(RateTable['2012/2013']),

      // THe 'my first job' scenario
      'WHEN I generate a payslip for an Annual Salary of $14,350 at a Super Rate of 9%, ': {
        topic: (topic) => {
          return topic.getPayslip(14350)
        },
        'THEN the Gross Income should be $1,196': (topic) => {
          assert.equal(topic.gross, 1196)
        },
        'THEN the Net Income should be $1,196': (topic) => {
          assert.equal(topic.net, 1196)
        },
        'THEN the Tax should be $922': (topic) => {
          assert.equal(topic.incomeTax, 0)
        },
        'THEN the Super Contribution should be $108': (topic) => {
          assert.equal(topic.contribution, 108)
        },
        'THEN the Pay (Take-home) should be $1,088': (topic) => {
          assert.equal(topic.pay, 1088)
        }
      },

      // This tests the example given in the PDF
      'WHEN I generate a payslip for an Annual Salary of $60,050 at a Super Rate of 9%, ': {
        topic: (topic) => {
          return topic.getPayslip(60050)
        },
        'THEN the Gross Income should be $5,004': (topic) => {
          assert.equal(topic.gross, 5004)
        },
        'THEN the Net Income should be $4,082': (topic) => {
          assert.equal(topic.net, 4082)
        },
        'THEN the Tax should be $922': (topic) => {
          assert.equal(topic.incomeTax, 922)
        },
        'THEN the Super Contribution should be $450': (topic) => {
          assert.equal(topic.contribution, 450)
        },
        'THEN the Pay (Take-home) should be $3,632': (topic) => {
          assert.equal(topic.pay, 3632)
        }
      },

      // Next bracket
      'WHEN I generate a payslip for an Annual Salary of $120,000 at a Super Rate of 9%, ': {
        topic: (topic) => {
          return topic.getPayslip(120000)
        },
        'THEN the Gross Income should be $10,000': (topic) => {
          assert.equal(topic.gross, 10000)
        },
        'THEN the Net Income should be $7,304': (topic) => {
          assert.equal(topic.net, 7304)
        },
        'THEN the Tax should be $2,696': (topic) => {
          assert.equal(topic.incomeTax, 2696)
        },
        'THEN the Super Contribution should be $900': (topic) => {
          assert.equal(topic.contribution, 900)
        },
        'THEN the Pay (Take-home) should be $6,404': (topic) => {
          assert.equal(topic.pay, 6404)
        }
      },

      // Now test the Richie Rich bracket
      'WHEN I generate a payslip for an Annual Salary of $240,040 at a Super Rate of 9%, ': {
        topic: (topic) => {
          return topic.getPayslip(240040)
        },
        'THEN the Gross Income should be $20,003': (topic) => {
          assert.equal(topic.gross, 20003)
        },
        'THEN the Net Income should be $13,206': (topic) => {
          assert.equal(topic.net, 13206)
        },
        'THEN the Tax should be $6,797': (topic) => {
          assert.equal(topic.incomeTax, 6797)
        },
        'THEN the Super Contribution should be $1,800': (topic) => {
          assert.equal(topic.contribution, 1800)
        },
        'THEN the Pay (Take-home) should be $11,406': (topic) => {
          assert.equal(topic.pay, 11406)
        }
      },

      // But I'm a savvy rich person, so i'm going to boost my super contributions and get taxed at the lower rate.
      'WHEN I generate a payslip for an Annual Salary of $240,040 but up the Super Rate to 20%, ': {
        topic: (topic) => {
          return topic.getPayslip(240040, 0.2)
        },
        'THEN the Gross Income should be $20,003': (topic) => {
          assert.equal(topic.gross, 20003)
        },
        'THEN the Net Income should be $13,206': (topic) => {
          assert.equal(topic.net, 13206)
        },
        'THEN the Tax should be $6,797': (topic) => {
          assert.equal(topic.incomeTax, 6797)
        },
        'THEN the Super Contribution should be $4,001': (topic) => {
          assert.equal(topic.contribution, 4001)
        },
        'THEN the Pay (Take-home) should be $9,205': (topic) => {
          assert.equal(topic.pay, 9205)
        }
      }
    },

    // Test scenarios against the 2016,2017 table.
    '02 GIVEN I instance ATOPayCalculator with 2016/2017 Tax Year Rate Table, ': {
      topic: new ATOPayCalculator(RateTable['2016/2017']),

      // Middle class Aussies.
      'WHEN I generate a payslip for an Annual Salary of $86,350 at a Super Rate of 9%, ': {
        topic: (topic) => {
          return topic.getPayslip(86350)
        },
        'THEN the Gross Income should be $7,196': (topic) => {
          assert.equal(topic.gross, 7196)
        },
        'THEN the Net Income should be $5,562': (topic) => {
          assert.equal(topic.net, 5562)
        },
        'THEN the Tax should be $1,634': (topic) => {
          assert.equal(topic.incomeTax, 1634)
        },
        'THEN the Super Contribution should be $648': (topic) => {
          assert.equal(topic.contribution, 648)
        },
        'THEN the Pay (Take-home) should be $4,914': (topic) => {
          assert.equal(topic.pay, 4914)
        }
      }
    }
  })
  .export(module)
