const fs = require('fs')
const client = require('../../client')
const spinner = require('../../utils/spinner')

function errorSetAdd(serviceId, errorSetPath) {
  console.log(`Adding error set ${errorSetPath} to service ${serviceId}`)

  spinner.start()

  const json = fs.readFileSync(errorSetPath, 'utf8')
  const errorSet = JSON.parse(json)

  client
    .createServiceErrorSet(serviceId, errorSet)
    .then(result => {
      spinner.stop()
      console.log('Adding done')
      console.log(result)
    })
    .catch(err => {
      spinner.stop()
      console.error('Adding failed:')
      console.error(err)
    })
}

module.exports = errorSetAdd
