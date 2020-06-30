module.exports = (data) => {
  const number = new RegExp(/^-?[0-9]*(\.?[0-9]{3})*(?:,?[0-9]+)?$/)
  const datum = new RegExp(/^[\d]+\.[\d]+\.[\d]+$/)
  const datum2 = new RegExp(/^2[\d]{7}$/)
  for (const row of data) {
    row.forEach((field, index) => {
      if (number.test(field)) {
        if (field.indexOf(',') > 0 || field.indexOf('.') > 0) {
          row[index] = parseFloat(row[index].replace(/\./g, '').replace(',', '.'))
        }
      }
      if (datum.test(field)) {
        const da = field.split('.')
        row[index] = `${da[2]}-${da[1]}-${da[0]}`
      }
      if (datum2.test(field)) {
        row[index] = `${field[0]}${field[1]}${field[2]}${field[3]}-${field[4]}${field[5]}-${field[6]}${field[7]}`
      }
    })
  }
  return data
}
