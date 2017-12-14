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

  program
    .command('*')
    .action(function(unknownCommand){
      if(program._execs[unknownCommand]) {
        // if(program.rawArgs.length === 3) {
        //   program.help()
        //   process.exit(1)
        // }
      } else if(unknownCommand === '[object Object]') {
        program.help()
        process.exit(1)
      } else {
        console.error(`\n  error: unknown command \`${unknownCommand}\`\n`)
        console.log(`  show help with: ${program._name} --help\n`)
        process.exit(1)
      }
    });

  program.parse(process.argv)
}

module.exports = defineProgram
