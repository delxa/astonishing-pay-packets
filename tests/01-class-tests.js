require('babel-register')
var vows = require('vows')
var assert = require('assert')

// Because the rest of
var ATOPayCalculator = require('../app/common/modules/ATOPayCalculator').default // Default is used because ATOPayCalculator is an ES6 class.
var RateTable = require('../data/atotaxrates.json')

vows.describe('01 Class Implements Correctly')
  .addBatch({

    // Test basics of class instantiation
    '01 GIVEN I instance ATOPayCalculator with 2012/2013 Tax Year Rate Table, ': {
      topic: new ATOPayCalculator(RateTable['2012/2013']),
      'WHEN I instance the class, ': {
        topic: (topic) => {
          return topic
        },
        'THEN I should have a new instance of ATOPayCalculator': (topic) => {
          assert.instanceOf(topic, ATOPayCalculator)
        },
        'THEN I should have ATOPayCalculator with 5 x tax brackets': (topic) => {
          assert.lengthOf(topic.rateTable.brackets, 5)
        }
      }
    }

  })
  .export(module)
