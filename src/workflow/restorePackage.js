const updatePackage = require('../mashery/updatePackage')
const { readFileSync, resolveFile } = require('../utils/storage')
const spinner = require('../utils/spinner')

function restore (packageId, backupName) {
  const path = `backup/packages/${packageId}/${backupName}.json`

  console.log(
    `Running restore for package '${packageId}' from '${resolveFile(path)}'`
  )
  spinner.start()

  const json = readFileSync(path, 'utf8')
  const api = JSON.parse(json)

  return updatePackage(packageId, api)
    .then(() => {
      spinner.stop()
      console.log('Restore finished')
    })
    .catch(error => {
      spinner.stop()
      console.error('Restore failed. Reason:')
      console.error(error)
    })
}

module.exports = restore
