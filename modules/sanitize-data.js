module.exports = (data) => {
  const number = new RegExp(/^-?[0-9]*(\.?[0-9]{3})*(?:,?[0-9]+)?$/)
  const date = new RegExp(/^[\d]+\.[\d]+\.[\d]+$/)
  const date2 = new RegExp(/^2[\d]{7}$/)
  return data.map(row => row.map(sanitizeField(number, date, date2)))
}

function sanitizeField (number, date, date2) {
  return field => {
    if (number.test(field)) {
      if (field.indexOf(',') > 0 || field.indexOf('.') > 0) {
        return parseFloat(field.replace(/\./g, '').replace(',', '.'))
      }
    }
    if (date.test(field)) {
      return field.split('.').reverse().join('-')
    }
    if (date2.test(field)) {
      return `${field[0]}${field[1]}${field[2]}${field[3]}-${field[4]}${field[5]}-${field[6]}${field[7]}`
    }
    return field
  }
}
