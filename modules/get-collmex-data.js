const iconv = require('iconv-lite')

module.exports = function (opts) {
  const req = getRequestBody.bind(this)(opts)
  const login = `LOGIN;${this.User};${this.Password}\n`
  return makeRequest.bind(this)(login, req)
}

function getRequestBody (opts) {
  const satzarten = require('./load-satzarten.js')()
  return opts.reduce((req, opt) => {
    const satz = JSON.parse(JSON.stringify(satzarten))[opt.Satzart]
    for (const prop in opt) {
      satz[prop] = opt[prop]
    }
    for (const prop of ['Firma_Nr', 'Systemname']) {
      if (Object.prototype.hasOwnProperty.call(satz, prop)) {
        satz[prop] = opt[prop] || this[prop]
      }
    }
    return req + `${Object.values(satz).join(';')}\n`
  }, '')
}

function makeRequest (login, req) {
  const fetch = require('node-fetch')
  const postData = `${login}${req}`
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/csv'
    },
    body: iconv.encode(postData, 'ISO-8859-1')
  }
  return fetch(`https://www.collmex.de/cgi-bin/cgi.exe?${this.CMXKundennummer},0,data_exchange`, init).then(extractRequestBodyHandler)
}

function extractRequestBodyHandler (res) {
  const converterStream = iconv.decodeStream('ISO-8859-1')
  res.body.pipe(converterStream)
  let data = ''
  converterStream.on('data', dataChunk => {
    data += dataChunk
  })
  return new Promise(resolve => converterStream.on('end', () => resolve(data)))
}
