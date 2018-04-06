const updateApi = require('../mashery/updateApi')
const { readFileSync, resolveFile } = require('../utils/storage')
const spinner = require('../utils/spinner')

function restore (serviceId, backupName) {
  const path = `backup/services/${serviceId}/${backupName}.json`

  console.log(
    `Running restore for service '${serviceId}' from '${resolveFile(path)}'`
  )
  spinner.start()

  const json = readFileSync(path, 'utf8')
  const api = JSON.parse(json)

  return updateApi(serviceId, api)
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
