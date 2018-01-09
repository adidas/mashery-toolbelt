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
    memo.push(val);
    return memo;
  }

  program
    .command('promote <serviceId>')
    .option('--name <name>', 'name replace pattern', collect, [])
    .option('--trafficDomain <trafficDomain>', 'traffic domain replace pattern', collect, [])
    .option('--publicDomain <publicDomain>', 'public domain replace pattern', collect, [])
    .option('--publicPath <publicPath>', 'public path replace pattern', collect, [])
    .option('--endpointDomain <endpointDomain>', 'endpoint domain replace pattern', collect, [])
    .option('--endpointPath <endpointPath>', 'endpoint path replace pattern', collect, [])
    .option('-i, --ignoreOtherEnv', 'ignore if api contains other environments than requested one')
    .description('Promote service to new API to different environemnt')
    .action((serviceId, options) => runPromote(serviceId, options))

  // Standalone programs
  program
    .command('errorset', 'Interface for error sets')
})
