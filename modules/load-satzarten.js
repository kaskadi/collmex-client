module.exports = () => {
  const path = require('path')
  const filePath = path.join(__dirname, '..', 'data', 'satzarten.json')
  const { existsSync } = require('fs')
  const fallbackPath = `${filePath.slice(0, -5)}.original${filePath.slice(-5)}`
  return existsSync(filePath) ? require(filePath) : require(fallbackPath)
}
