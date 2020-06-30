module.exports = (data) => {
  const satzarten = require('./satzarten.json')
  data.forEach((row, index) => {
    const satz = satzarten[row[0]]
    const keys = Object.keys(satz)
    row.forEach((field, index) => {
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
