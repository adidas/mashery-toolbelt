const dumpPackage = require('../mashery/dumpPackage')
const { writeFileSync, resolveFile } = require('../utils/storage')
const spinner = require('../utils/spinner')

function backup (packageId, backupName) {
  console.log(`Running backup for package '${packageId}'`)
  spinner.start()
  dumpPackage(packageId)
    .then(data => {
      backupName = backupName || +new Date()
      const path = `backup/packages/${packageId}/${backupName}.json`
      writeFileSync(path, JSON.stringify(data, null, 2))
      spinner.stop()
      console.log(`Package backup done in '${resolveFile(path)}'`)
      console.log(`Backup name: '${backupName}'`)
    })
    .catch(error => {
      spinner.stop()
      console.error('Backup failed:')
      console.error(error)
    })
}

module.exports = backup
