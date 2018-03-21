/*
  Command Line Interface
  Supports: auth, ls, backup, restore, promote, errorset
*/

const appPackage = require('../../package.json')
const program = require('commander')

function defineProgram ({ description }, callProgram) {
  program.version(appPackage.version)
  // .option('-v, --verbose', 'verbose mode')

  callProgram(program)

  program.parse(process.argv)

  if (!process.argv.slice(2).length) {
    program.help()
    process.exit(0)
  }
}

module.exports = defineProgram
