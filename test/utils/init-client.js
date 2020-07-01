module.exports = () => {
  let options = {}
  try {
    options = require('../data/options.json')
  } catch (err) {
    options = require('../data/options.default.json')
  }
  return require('../../index.js')(options)
}
