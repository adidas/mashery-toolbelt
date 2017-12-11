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
    .command('ls [name]')
    .description('List all services. Optionally filtered by name')
    .action((name) => runLs(name))

  program
    .command('backup <serviceId> [backupName]')
    .description('Backup all data for given service')
    .action((serviceId, backupName) => runBackup(serviceId, backupName))

  program
    .command('restore <serviceId> <backupName>')
    .description('Restore given service from existing backup')
    .action((serviceId, backupName) => runRestore(serviceId, backupName))

  program
    .command('promote <serviceId> <environment> <systemDomain>')
    .description('Promote service to new API to different environemnt and system domain')
    .action((serviceId, environemnt, systemDomain) => {
      runPromote(serviceId, environemnt, systemDomain)
    })
})
