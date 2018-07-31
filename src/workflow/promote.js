const createApi = require('../mashery/createApi')
const dumpApi = require('../mashery/dumpApi')
const mergeApi = require('../mashery/mergeApi')
const updateApi = require('../mashery/updateApi')
const modifyValues = require('./adidas/modifyValues')
const spinner = require('../utils/spinner')
const confirmChanges = require('../utils/confirmChanges')

function createFromPromote (api, newApi) {
  return confirmChanges
    .withOverview({
      before: api,
      after: newApi,
      property: 'service.endpoints',
      message: 'Are this valid changes in promoted API?',
      action: newData => {
        spinner.start()
        return createApi(newData)
      }
    })
    .then(newService => {
      spinner.stop()
      console.log(
        `Promoting done. https://adidas.admin.mashery.com/control-center/api-definitions/${
          newService.id
        }`
      )
    })
}

function updateFromPromote (api, updateServiceId) {
  spinner.start()

  return dumpApi(updateServiceId, DUMP_FIELDS)
    .then(dumpedApi => {
      spinner.stop()

      return confirmChanges.withOverview({
        before: dumpedApi,
        after: mergeApi(api, dumpedApi),
        property: 'service.endpoints',
        message: `Are this valid updates from promoting to service '${updateServiceId}'?`,
        action (updatedData) {
          spinner.start()
          return updateApi(updateServiceId, updatedData)
        }
      })
    })
    .then(updatedService => {
      spinner.stop()
      console.log(
        `Updating api from promoting done https://adidas.admin.mashery.com/control-center/api-definitions/${
          updatedService.id
        }`
      )
    })
}

const DUMP_FIELDS = {
  except: ['created', 'updated'],
  endpoints: {
    except: ['created', 'updated'],
    methods: true
  },
  errorSets: true
}

function promote (serviceId, options) {
  console.log(`Promoting service '${serviceId}'`)

  spinner.start()

  dumpApi(serviceId, DUMP_FIELDS)
    .then(sourceApi => {
      spinner.stop()

      const newApi = modifyValues(sourceApi, options)

      const updateServiceId = options.update
      return updateServiceId
        ? updateFromPromote(newApi, updateServiceId.trim())
        : createFromPromote(sourceApi, newApi)
    })
    .catch(error => {
      spinner.stop()
      console.error('Promote failed:')
      console.error(error)
    })
}

module.exports = promote
