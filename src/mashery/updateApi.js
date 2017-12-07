const dumpApi = require('./dumpApi')
const client = require('../client')

function extractData({ id, created, updated, ...data }) {
  return data
}

function getCurrentIds(serviceId) {
  const fields = {
    serviceFields: false,
    endpointFields: ['id'],
    errorSetFields: ['id']
  }

  return dumpApi(serviceId, fields).then(({ endpoints, errorSets }) => ({
    endpoints: endpoints.map(({ id }) => id),
    errorSets: errorSets.map(({ id }) => id)
  }))
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

function callChanges(
  { toCreate, toUpdate, toDelete },
  pathBaseName,
  ...pathArguments
) {
  return Promise.all([
    ...toCreate.map(data =>
      client[`create${pathBaseName}`](...pathArguments, extractData(data))
    ),
    ...toUpdate.map(data =>
      client[`update${pathBaseName}`](
        ...pathArguments,
        data.id,
        extractData(data)
      )
    ),
    ...toDelete.map(({ id }) =>
      client[`delete${pathBaseName}`](...pathArguments, id)
    )
  ])
}

function updateApi(serviceId, api) {
  const { service, endpoints, errorSets } = api

  return getCurrentIds(serviceId).then(currentIds => {
    const endpointsChanges = prepareChanges(endpoints, currentIds.endpoints)
    const errorSetsChanges = prepareChanges(errorSets, currentIds.errorSets)

    return Promise.all([
      client.updateService(serviceId, extractData(service)),
      callChanges(endpointsChanges, 'ServiceEndpoint', serviceId),
      callChanges(errorSetsChanges, 'ServiceErrorSet', serviceId)
    ])
  })
}

module.exports = updateApi
