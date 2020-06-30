module.exports = (data) => {
  const satzarten = require('./satzarten.json')
  return data.map(row => {
    const satz = satzarten[row[0]]
    return Object.fromEntries(Object.keys(satz).map((key, index) => [key, row[index] || '']))
  })
}
