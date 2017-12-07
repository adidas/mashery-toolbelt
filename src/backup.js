const dumpApi = require('./mashery/dumpApi')
const { writeFileSync, resolveFile } = require('./utils/storage')
const spinner = require('./utils/spinner');

function backup(serviceId) {
  console.log(`Running backup for service '${serviceId}'`)
  spinner.start()
  dumpApi(serviceId).then(data => {
    const path = `backup/${serviceId}/${+new Date}.json`
    writeFileSync(path, JSON.stringify(data, null, 2))
    spinner.stop()
    console.log(`Service backup done in '${resolveFile(path)}'`)
  })
  .catch(() => {
    spinner.stop()
    console.error('Backup failed')
  })
}

module.exports = backup
