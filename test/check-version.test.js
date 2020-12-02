/* eslint-env mocha */
const assert = require('chai').assert
const capcon = require('capture-console')
const pjson = require('../package.json')
const originalVersion = pjson.version
const { writeFileSync } = require('fs')

describe('collmex-client check version utility', function () {
  it('should warn if version is behind on patches', function () {
    updatePjsonVersion(getWrongVersion(originalVersion, 2))
    test(true)
  })
  it('should warn if version is behind on minors', function () {
    updatePjsonVersion(getWrongVersion(originalVersion, 1))
    test(true)
  })
  it('should warn if version is behind on majors', function () {
    updatePjsonVersion(getWrongVersion(originalVersion, 0))
    test(true)
  })
  it('should not warn if version is latest', function () {
    updatePjsonVersion(originalVersion)
    test(false)
  })
  after(function () {
    writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(pjson, null, 2), 'utf8')
  })
})

function getWrongVersion (originalVersion, i) {
  const versions = originalVersion.split('.').map(Number)
  return [...versions.slice(0, i), versions[i] - 1, ...versions.slice(i + 1)]
    .map(String)
    .join('.')
}

function updatePjsonVersion (version) {
  const newPjson = { ...pjson, version }
  writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(newPjson, null, 2), 'utf8')
}

function test (warningFound) {
  const stdout = capcon.captureStdout(function () {
    require('../')()
  })
  const lines = stdout.split('\n')
  const warningLine = lines.filter(line => line.startsWith('WARNING: your local version'))
  assert.equal(warningLine.length === 1, warningFound)
}
