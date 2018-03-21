/*
  Basic file functions scoped under HOMEDIR/.mashery-toolbelt directory
  Exports: readFileSync, writeFileSync, unlinkSync functions

  Example:
    writeFileSync('/data/services/1.json', someData)
    will create file HOMEDIR/.mashery-toolbelt/data/services/1.json
    (for windows: C:\Users\USERNAME\.mashery-toolbelt\data\services\1.json)
*/

const os = require('os')
const path = require('path')
const fs = require('fs')

const SEPARATOR = path.sep
const APP_ROOT = '.mashery-toolbelt'

function mkdirpSync (targetDir) {
  const initDir = path.isAbsolute(targetDir) ? SEPARATOR : ''

  targetDir.split(SEPARATOR).reduce((parentDir, childDir) => {
    const curDir = path.resolve(parentDir, childDir)

    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir)
    }

    return curDir
  }, initDir)
}

// Get full path to file
function resolveFile (file) {
  return path.join(os.homedir(), APP_ROOT, file)
}

// Get full path to file and create directory
function prepareFile (file) {
  const filePath = resolveFile(file)
  mkdirpSync(path.dirname(filePath))
  return filePath
}

function readFileSync (file, options) {
  return fs.readFileSync(resolveFile(file), options)
}

function writeFileSync (file, data, options) {
  return fs.writeFileSync(prepareFile(file), data, options)
}

// TODO: optimise and remove all parent empty directories
function unlinkSync (file) {
  return fs.unlinkSync(resolveFile(file))
}

module.exports = {
  readFileSync,
  resolveFile,
  unlinkSync,
  writeFileSync
}
