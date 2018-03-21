function mergeApi (sourceAPI, targetAPI) {
  const {
    service: {
      endpoints: sourceEndpoints,
      organization: sourceOrganization,
      errorSets: sourceErrorSets,
      ...sourceService
    }
  } = sourceAPI
  const {
    service: {
      endpoints: targetEndpoints,
      organization: targetOrganization,
      errorSets: targetErrorSets,
      ...targetService
    }
  } = targetAPI

  // We leave just one error set
  const errorSet = mergeErrorSets(sourceErrorSets, targetErrorSets)
  const service = mergeService(sourceService, targetService)
  const organization = mergeOrganization(sourceOrganization, targetOrganization)
  const endpoints = mergeEndpoints(sourceEndpoints, targetEndpoints, errorSet)

  const api = {
    service: {
      ...service,
      organization,
      endpoints,
      errorSets: errorSet ? [errorSet] : undefined
    }
  }

  return api
}

// Remove irelevant properties
function cleanupEntity ({ created, updated, ...data }, removeId = false) {
  if (removeId) {
    delete data.id
  }

  return data
}

function mergeErrorSets ([sourceErrorSet] = [], [targetErrorSet] = []) {
  if (!sourceErrorSet && !targetErrorSet) {
    return null
  }

  if (!sourceErrorSet) {
    return targetErrorSet
  }

  return cleanupEntity(sourceErrorSet, true)
}

function mergeService ({ id, ...sourceService }, { ...targetService }) {
  return Object.assign(
    cleanupEntity(targetService),
    cleanupEntity(sourceService)
  )
}

function mergeOrganization (source, target) {
  if (!source) {
    return null
  }

  return Object.assign(source, target || {})
}

function mergeEndpoints (sourceEndpoints, targetEndpoints, errorSet) {
  const endpoints = []

  sourceEndpoints.forEach(sourceEndpoint => {
    const sourceId = sourceEndpoint.id
    let match

    // 1. Find by ID
    if (typeof sourceId === 'string') {
      match = targetEndpoints.find(({ id }) => sourceId === id)
    }

    // 2. Find by name
    if (match === undefined) {
      const fullName = sourceEndpoint.name
      // const nameWithoutEnv = fullName.replace(/^[A-Z]{2,4}\s+/, '')
      match = targetEndpoints.find(
        ({ name }) => fullName === name /* || name.endsWith(nameWithoutEnv) */
      )
    }

    // 3. Find by domains and paths
    // TODO

    if (match !== undefined) {
      if (!sourceId) {
        sourceEndpoint.id = match.id
      } else if (!match.id) {
        match.id = sourceId
      }

      endpoints.push(mergeEndpoint(sourceEndpoint, match))
    } else {
      // Creating new endpoint
      endpoints.push(cleanupEntity(sourceEndpoint))
    }
  })

  return endpoints.map(endpoint => assignErrorSetToEndpoint(endpoint, errorSet))
}

function mergeEndpoint (
  { id, methods: sourceMethods, ...sourceEndpoint },
  { methods: targetMethods, ...targetEndpoint }
) {
  const methods = mergeEndpointMethods(sourceMethods, targetMethods)

  return Object.assign(
    cleanupEntity(targetEndpoint),
    cleanupEntity(sourceEndpoint),
    { methods }
  )
}

function mergeEndpointMethods (sourceMethods = [], targetMethods = []) {
  const methods = []

  sourceMethods.forEach(sourceMethod => {
    const sourceId = sourceMethod.id
    let match

    // 1. Find by ID
    if (typeof sourceId === 'string') {
      match = targetMethods.find(({ id }) => sourceId === id)
    }

    // 2. Find by name
    if (match === undefined) {
      const sourceName = sourceMethod.name
      match = targetMethods.find(({ name }) => sourceName === name)
    }

    if (match !== undefined) {
      methods.push(Object.assign({}, match, cleanupEntity(sourceMethod, true)))
    } else {
      // Creating new endpoint
      methods.push(cleanupEntity(sourceMethod))
    }
  })

  return methods
}

function assignErrorSetToEndpoint (
  { errors: { errorSet: _, ...errors } = {}, ...endpoint },
  errorSet
) {
  if (!errorSet) {
    return {
      ...endpoint,
      errors
    }
  }

  return {
    ...endpoint,
    errors: {
      errorSet: {
        id: errorSet.id,
        name: errorSet.name
      },
      ...errors
    }
  }
}

module.exports = mergeApi
