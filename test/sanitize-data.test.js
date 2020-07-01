/* eslint-env mocha */
const assert = require('chai').assert
const sanitizeData = require('../modules/sanitize-data.js')

describe('collmex sanitizeData module', function () {
  it('should parse ints', function () {
    const array = [['1'], ['12'], ['123456']]
    const validationArray = array
    testArray(array, validationArray)
  })
  it('should parse negative ints', function () {
    const array = [['-1'], ['-12'], ['-123456']]
    const validationArray = array
    testArray(array, validationArray)
  })
  it('should parse ints with decimal points', function () {
    const array = [['1.000'], ['1.000.000'], ['1.000.000.000']]
    const validationArray = [['1000'], ['1000000'], ['1000000000']]
    testArray(array, validationArray)
  })
  it('should parse floats', function () {
    const array = [['0,1'], ['1,0'], ['1,000'], ['1.000,01']]
    const validationArray = [['0.1'], ['1.0'], ['1.000'], ['1000.01']]
    testArray(array, validationArray)
  })
  it('should parse negative floats', function () {
    const array = [['-10,99'], ['-1.000,27']]
    const validationArray = [['-10.99'], ['-1000.27']]
    testArray(array, validationArray)
  })
  it('should parse dates', function () {
    const array = [['01.01.2016'], ['20160101']]
    const validationArray = [['2016-01-01'], ['2016-01-01']]
    testArray(array, validationArray)
  })
  it('should not parse amazon bestellnummern', function () {
    const array = [['123-235235-235235']]
    const validationArray = array
    testArray(array, validationArray)
  })
  it('should not parse strings', function () {
    const array = [['A0006235'], ['-12a'], ['0-2'], ['0.0'], ['0,-']]
    const validationArray = array
    testArray(array, validationArray)
  })
})

function testArray (array, validationArray) {
  const sanitizedArray = sanitizeData(array)
  sanitizedArray.forEach((row, index) => assert.equal(row[0], validationArray[index][0]))
}
