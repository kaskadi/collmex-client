module.exports = () => {
  const path = `${process.cwd()}/data/satzarten.json`
  const { existsSync } = require('fs')
  const fallbackPath = `${path.slice(0, -5)}.originalS${path.slice(-5)}`
  return existsSync(path) ? require(path) : require(fallbackPath)
}
