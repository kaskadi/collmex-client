const { readFileSync } = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

module.exports = () => {
  const pjson = JSON.parse(readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'))
  const pkgName = pjson.name
  const localVer = pjson.version
  const npmData = JSON.parse(spawnSync('npm', ['view', pkgName, '--json']).stdout.toString())
  const remoteVer = npmData.version
  if (checkSum(localVer) < checkSum(remoteVer)) {
    console.log(`WARNING: your local version of ${pkgName} is ${localVer} while the latest available version on npm is ${remoteVer}. Please consider updating your client as you may be using an outdated CSV mapping...`)
  }
}

function checkSum (ver) {
  // here we do a weighted check sum where major version has a weight of 100, minor has 10 and patch has 1. We disregard the beta/alpha flags as we probably won't be using them
  return ver
    .split('.')
    .reduce((acc, cur, i) => acc + (10 ** (2 - i)) * cur, 0)
}
