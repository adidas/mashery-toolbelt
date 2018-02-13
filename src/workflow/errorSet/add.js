const fs = require('fs')
const client = require('../../client')
const spinner = require('../../utils/spinner')
const dumpApi = require('../../mashery/dumpApi')

const DUMP_FIELDS = {
  serviceFields: ['id'],
  endpointFields: ['id', 'errors'],
  methodFields: false,
  errorSetFields: false,
}

function errorSetAdd(serviceId, errorSetPath) {
  console.log(`Adding error set ${errorSetPath} to service ${serviceId}`)

  spinner.start()

  const json = fs.readFileSync(errorSetPath, 'utf8')
  const errorSet = JSON.parse(json)

  dumpApi(serviceId, DUMP_FIELDS)
    .then(api => {
      client
        .createServiceErrorSet(serviceId, errorSet)
        .then(newErrorSet => {
          return Promise.all(
            api.service.endpoints.map(({id}) => client.updateServiceEndpoint(serviceId, id, { errors: { errorSet: { id: newErrorSet.id } } }))
          ).then(() => newErrorSet)
        })
        .then(newErrorSet => {
          spinner.stop()
          console.log('Error Set created and assigned to all endpoints')
          console.log(newErrorSet)
        })
        .catch(err => {
          spinner.stop()
          console.error('Creating failed:')
          console.error(err)
        })
    })
}

module.exports = errorSetAdd
