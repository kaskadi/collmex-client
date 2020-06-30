"use strict";
const fetch = require('node-fetch')
const iconv = require('iconv-lite')
const parse = require('csv-parse/lib/sync')
const _satzarten = require('./modules/satzarten.json')

class Collmex {
  constructor (opts) {
    this.number = new RegExp(/^-?[0-9]*(\.?[0-9]{3})*(?:,?[0-9]+)?$/)
    this.User = opts.User || "noname"
    this.Password = opts.Password || "password"
    this.CMXKundennummer = opts.CMXKundennummer || "112233"
    this.Firma_Nr = opts.Firma_Nr || 1
    this.Systemname = opts.Systemname || "koa-collmex"
    this.Output = opts.Output || "object"
  }

  async get(opts, output = this.Output) {
    let req = ""
    if (!Array.isArray(opts)) {
      opts = [opts]
    }
    for (const opt of opts) {
      let satz = _satzarten[opt.Satzart]
      for (const prop in opt) {
        satz[prop] = opt[prop]
      }
      if (satz.hasOwnProperty("Firma_Nr")) {
        satz.Firma_Nr = opt.Firma_Nr || this.Firma_Nr
      }
      if (satz.hasOwnProperty("Systemname")) {
        satz.Systemname = opt.Systemname || this.Systemname
      }
      req += satz2CSV(satz)
    }
    const login = `LOGIN;${this.User};${this.Password}\n`
    const post_data = `${login}${req}`
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/csv'
      },
      body: iconv.encode(post_data, 'ISO-8859-1')
    }
    const data = await fetch(`https://www.collmex.de/cgi-bin/cgi.exe?${this.CMXKundennummer},0,data_exchange`, init)
    .then(res => {
      const converterStream = iconv.decodeStream('ISO-8859-1')
      res.body.pipe(converterStream)
      let data = ''
      converterStream.on('data', dataChunk => {
        data+=dataChunk
      })
      return new Promise(resolve => converterStream.on('end', () => resolve(data)))
    })
    if (output === 'raw') {
      return data
    }
    let parsedData = parse(data, { delimiter: ";", relax_column_count: true })
    const number = this.number
    const datum  = new RegExp(/^[\d]+\.[\d]+\.[\d]+$/)
    const datum2  = new RegExp(/^2[\d]{7}$/)
    for (const row of parsedData) {
      row.forEach((field, index) => {
        if (number.test(field)) {
          if (field.indexOf(",") > 0 || field.indexOf(".") > 0) {
            row[index] = parseFloat(row[index].replace(/\./g, '').replace(",","."))
          }
        }
        if (datum.test(field)) {
          const da = field.split(".")
          row[index] = `${da[2]}-${da[1]}-${da[0]}`
        }
        if (datum2.test(field)) {
          row[index] = `${field[0]}${field[1]}${field[2]}${field[3]}-${field[4]}${field[5]}-${field[6]}${field[7]}`
        }
      })
    }
    if (output === 'array') {
      return parsedData
    }
    if (output === 'object') {
      return this.parse(parsedData)
    }
    return parsedData
  }

  parse (data) {
    data.forEach((row,index) => {
      let satz = _satzarten[row[0]]
      const keys = Object.keys(satz)
      row.forEach((field,index) => {
        if (keys[index]) {
          satz[keys[index]] = field
        } else {
          console.log(satz.Satzart)
        }
      })
      data[index] = satz
    })
    return data
  }
}

function satz2CSV(satz){
  const arr = []
  for (const prop in satz) {
    arr.push(satz[prop])
  }
  return `${arr.join(";")}\n`
}

module.exports = opts => new Collmex(opts)