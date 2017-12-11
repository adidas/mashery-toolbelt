/*
  Command Line Interface
  Supports: auth, ls, backup, restore, promote, errorset
*/

const package = require('../../package.json')
const program = require('commander')

function defineProgram({ description}, callProgram) {
  program
    .version(package.version)
    .option('-v, --verbose', 'verbose mode')

  callProgram(program)

  // program.on('*', function (command) {
  //   console.log("XXXX")
  //   this.commands.some(function (command) {
  //     return command._name === argv[0];
  //   }) || this.help();
  // })

  program.parse(process.argv)

  if (program.args.length === 0) {
    program.help()
  } else {
    const cmd = program.args[0]

    if (!program._execs[cmd]) {
      console.error(`\n  error: unknown command \`${cmd}\`\n`)
      console.log('  show help with: mashery-toolbelt --help\n')
      process.exit(1)
    }
  }
}

module.exports = defineProgram
