/*
  Command Line Interface for error sets
  Supports: add
*/

const defineProgram = require('../utils/defineProgram')
const runErrorSetAdd = require('../workflow/errorSet/add')

defineProgram({
  description: 'Mashery error sets interface command line tool'
}, function(program) {
  program
    .command('add <serviceId> <errorSetPath>')
    .description('Add given error set to service')
    .action((serviceId, errorSetPath) => runErrorSetAdd(serviceId, errorSetPath))
})
