module.exports = (data) => {
  const satzarten = require('./load-satzarten.js')()
  return data.map(row => {
    const satz = satzarten[row[0]]
    return Object.fromEntries(Object.keys(satz).map((key, index) => [key, row[index] || '']))
  })
}
