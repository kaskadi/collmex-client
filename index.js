'use strict'
const getCollmexData = require('./modules/get-collmex-data.js')
const parseCSV = require('csv-parse/lib/sync')
const sanitizeData = require('./modules/sanitize-data.js')
const parseData = require('./modules/parse-data.js')

class Collmex {
  constructor (opts) {
    this.User = opts.User || 'noname'
    this.Password = opts.Password || 'password'
    this.CMXKundennummer = opts.CMXKundennummer || '112233'
    this.Firma_Nr = opts.Firma_Nr || 1
    this.Systemname = opts.Systemname || 'collmex-client'
    this.Output = opts.Output || 'object'
  }

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
