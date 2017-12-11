const dumpApi = require('./dumpApi')
const applyChanges = require('./utils/applyChanges')

const CURRENT_IDS_FIELDS = {
  serviceFields: false,
  endpointFields: ['id'],
  errorSetFields: ['id']
}

function getCurrentIds(serviceId) {
  return dumpApi(serviceId, CURRENT_IDS_FIELDS).then(
    ({ endpoints, errorSets }) => ({
      endpoints: endpoints.map(({ id }) => id),
      errorSets: errorSets.map(({ id }) => id)
    })
  )
}

function prepareChanges(newData, currentIds) {
  const newIds = newData.map(({ id }) => id)
  const toDelete = []
  const toUpdate = []
  const toCreate = []

  newData.forEach(data => {
    if (currentIds.includes(data.id)) {
      toUpdate.push(data)
    } else {
      toCreate.push(data)
    }
  })

  currentIds.forEach(id => {
    if (!newIds.includes(id)) {
      toDelete.push({ id })
    }
  })

  return { toCreate, toUpdate, toDelete }
}

// TODO:
// Promise should return stats about changes
// On error can we perform rollback?
function updateApi(serviceId, api, { verbose = false } = {}) {
  verbose && console.log(`Updating service ${serviceId}`)
  const { service, endpoints, errorSets } = api

  return getCurrentIds(serviceId)
    .then(currentIds => {
      const endpointsChanges = prepareChanges(endpoints, currentIds.endpoints)
      const errorSetsChanges = prepareChanges(errorSets, currentIds.errorSets)

      return Promise.all([
        applyChanges({ toUpdate: [service] }, 'Service'),
        applyChanges(endpointsChanges, 'ServiceEndpoint', serviceId),
        applyChanges(errorSetsChanges, 'ServiceErrorSet', serviceId)
      ])
    })
    .then(data => {
      verbose && console.log(`Updating done`)
      return data
    })
    .catch(err => {
      if (verbose) {
        console.error('Updating failed:')
        console.error(err)
      }

      return Promise.reject(err)
    })
}

module.exports = updateApi
