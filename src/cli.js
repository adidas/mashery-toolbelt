/*
  Command Line Interface
  Supports: auth, ls, backup, restore, promote, errorset
*/

const defineProgram = require('./utils/defineProgram')
const runAuth = require('./workflow/auth')
const runLs = require('./workflow/ls')
const runBackup = require('./workflow/backup')
const runRestore = require('./workflow/restore')
const runPromote = require('./workflow/promote')
const runSwaggerImport = require('./workflow/swagger/import')
const runErrorSetAdd = require('./workflow/errorSet/add')


defineProgram({
  description: 'Mashery remote command tool'
}, function(program) {
  program
    .command('auth', /* <username> <password> <key> <secret> <areauuid> */)
    .description('Authenticate to mashery API with simple wizard')
    .action(() => runAuth())

  program
    .command('ls [search]')
    .description('List all services. Optionally you can search for specific part of name')
    .action((search) => runLs(search))

  program
    .command('backup <serviceId> [backupName]')
    .description('Backup all data for given service')
    .action((serviceId, backupName) => runBackup(serviceId, backupName))

  program
    .command('restore <serviceId> <backupName>')
    .description('Restore given service from existing backup')
    .action((serviceId, backupName) => runRestore(serviceId, backupName))

  // Allow to have multiple option values
  function collect(val, memo) {
    if(!Array.isArray(memo)) { memo = [] }

    memo.push(val);
    return memo;
  }

  function withCallers(...callers) {
    return function(command) {
      return callers.reduce((command, caller) => caller(command), command)
    }
  }

  function withModificationArguments(command) {
    return command
      .option('--name <name>', 'Name replace pattern', collect)
      .option('--trafficDomain <trafficDomain>', 'Traffic domain replace pattern', collect)
      .option('--publicDomain <publicDomain>', 'Public domain replace pattern', collect)
      .option('--publicPath <publicPath>', 'Public path replace pattern', collect)
      .option('--endpointDomain <endpointDomain>', 'Endpoint domain replace pattern', collect)
      .option('--endpointPath <endpointPath>', 'Endpoint path replace pattern', collect)
  }

  function withUpdateArgument(command) {
    return command.option('-u, --update <targetServiceId>', 'Service which should be updated with this command')
  }

  withCallers(withUpdateArgument, withModificationArguments)(
    program
      .command('promote <serviceId>')
      .option('-i, --ignoreOtherEnv', 'Ignore if api contains other environments than requested one')
      .description('Promote service to new API to different environemnt')
      .action((serviceId, options) => {
        runPromote(serviceId, options)
      })
  )

  withCallers(withUpdateArgument, withModificationArguments)(
    program
      .command('swagger-import <fileOrUrl>')
      .option('-b, --blueprint <blueprintFile>', 'File with default values.')
      .option('-s, --https', 'Https protocol for all endpoints')
      .option('-m, --multiMethodEndpoint', 'Creates one endpoint for same resource nad multiple HTTP methods instead of one enpoint per HTTP method')
      .option('-o, --organization <organizationId>', 'Organization under which service will be created')
      .description('Build api from given swagger file or URL')
      .action((swagger, options) => {
        runSwaggerImport(swagger, options)
      })
  )

  program
    .command('errorset-add <serviceId> <file>')
    .description('Add given error set to service')
    .action((serviceId, file) => {
      runErrorSetAdd(serviceId, file)
    })
})
