const createApi = require('../mashery/createApi')
const dumpApi = require('../mashery/dumpApi')
const mergeApi = require('../mashery/mergeApi')
const updateApi = require('../mashery/updateApi')
const modifyValues = require('./adidas/modifyValues')
const spinner = require('../utils/spinner')
const confirmChanges = require('../utils/confirmChanges')

function createFromPromote(api, newApi) {
  return confirmChanges({
    before: api,
    after: newApi,
    message: 'Are this valid changes in promoted API?',
    action: newData => {
      spinner.start()
      return createApi(newData)
    },
  })
  .then(newService => {
    spinner.stop()
    console.log('Promoting done')
    console.log(`Service id=${newService.id}`)
  })
}

function updateFromPromote(api, swagger) {
  spinner.start();

  return dumpApi(serviceId)
    .then(dumpedApi => {
      spinner.stop();

      return confirmChanges({
        before: dumpedApi,
        after: mergeApi(api, dumpedApi),
        message: `Are this valid updates from promoting to service '${serviceId}'?`,
        action(updatedData) {
          spinner.start();
          return updateApi(serviceId, updatedData);
        }
      });
    })
    .then(() => {
      spinner.stop();
      console.log("Updating api from promoting done");
    });
}

const DUMP_FIELDS = {
  serviceFields: {
    except: ['created', 'updated', 'endpoints', 'errorSets']
  },
  endpointFields: { except: ['created', 'updated', 'methods'] }
}

function promote(serviceId, options) {
  console.log(`Promoting service '${serviceId}'`)

  spinner.start()

  dumpApi(serviceId, DUMP_FIELDS)
    .then(promotingApi => {
      spinner.stop()

      const newApi = modifyValues(promotingApi, options)

      const updateServiceId = options.update;
      return updateServiceId
        ? updateFromPromote(newApi, updateServiceId)
        : createFromPromote(promotingApi, newApi);
    })
    .catch(error => {
      spinner.stop()
      console.error('Promote failed:')
      console.error(error)
    })
}

module.exports = promote
