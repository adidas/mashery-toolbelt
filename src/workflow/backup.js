const dumpApi = require('../mashery/dumpApi')
const { writeFileSync, resolveFile } = require('../utils/storage')
const spinner = require('../utils/spinner')

function backup (serviceId, backupName) {
  console.log(`Running backup for service '${serviceId}'`)
  spinner.start()
  dumpApi(serviceId)
    .then(data => {
      backupName = backupName || +new Date()
      const path = `backup/services/${serviceId}/${backupName}.json`
      writeFileSync(path, JSON.stringify(data, null, 2))
      spinner.stop()
      console.log(`Service backup done in '${resolveFile(path)}'`)
      console.log(`Backup name: '${backupName}'`)
    })
    .catch(error => {
      spinner.stop()
      console.error('Backup failed:')
      console.error(error)
    })
}

module.exports = backup
