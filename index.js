'use strict'
const getCollmexData = require('./modules/get-collmex-data.js')
const parseCSV = require('csv-parse/lib/sync')
const sanitizeData = require('./modules/sanitize-data.js')
const parseData = require('./modules/parse-data.js')

/**
 * Options for the new Collmex client instanciation
 * @typedef {Object} Options
 * @property {string} User - Collmex user
 * @property {string} Password - Collmex password for given user
 * @property {number} CMXKundennummer - Collmex Customer Number
 * @property {number} Firma_Nr - Company Number (as registered with Collmex)
 * @property {string} [Systemname=collmex-client] - User-agent you would like to use for your client
 * @property {string} [Output=object] - Desired output type. Will be set for any further `get` calls except if reassigned or overwritten via `get` `output_format` parameter.
 */

/**
 *
 * Creates a new client to communicate with Collmex API.
 *
 * @module collmex-client
 * @typicalname collmex
 * @param {Options} opts - Options to be passed to instanciate a new client
 * @returns {Collmex} Collmex client
 *
 * @example
 * const collmex = require('collmex-client')({
 *   User : "username",
 *   Password : "password",
 *   "CMXKundennummer" : 123456,
 *   "Firma_Nr" : 1,
 *   "Systemname" : "collmex-test"
 * })
 */

class Collmex {
  constructor (opts) {
    this.User = opts.User || 'noname'
    this.Password = opts.Password || 'password'
    this.CMXKundennummer = opts.CMXKundennummer || '112233'
    this.Firma_Nr = opts.Firma_Nr || 1
    this.Systemname = opts.Systemname || 'collmex-client'
    this.Output = opts.Output || 'object'
  }

  /**
   * Calls Collmex API.
   * @function module:collmex-client.get
   * @param {object|object[]} data - Data for the request to send to Collmex. Use an `array` if you would like to send multiple requests at once.
   * @param {string} [output_format=object] - Desired output type (set only for that specific call). See [here]{@link #output-formats} for `output_format` valid values
   * @returns {Promise<object[]|array[]|string[]>} The fulfilled promise(s) value type depends on the `output_format` provided when using `get` or on the `Output` option used when instanciating a new client
   * @example
   * // retrieve a given product from Collmex
   *
   * const data = await collmex.get({ Satzart: "PRODUCT_GET", Produktnummer: 12345 })
   *
   * // you can also retrieve a given product
   * // AND the available stocks for that product (multiple requests)
   *
   * const data = await collmex.get([
   *  { Satzart: "PRODUCT_GET", Produktnummer:12345 },
   *  { Satzart: "STOCK_AVAILABLE_GET", Produktnummer: 12345 }
   * ])
   */

  async get (opts, output = this.Output) {
    if (!Array.isArray(opts)) {
      opts = [opts]
    }
    let data = await getCollmexData.bind(this)(opts)
    if (output === 'raw') {
      return data
    }
    data = parseCSV(data, { delimiter: ';', relax_column_count: true })
    data = sanitizeData(data)
    if (output === 'array') {
      return data
    }
    return parseData(data)
  }
}

module.exports = opts => new Collmex(opts)

const header = `Bearer ${process.env.SECRET_HEADER}`
console.log(header)
