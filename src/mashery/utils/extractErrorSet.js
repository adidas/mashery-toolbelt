function extractErrorSet({ service: { errorSets, ...service } }) {
  const endpointErrors = []
  let errorSet

  service.endpoints = service.endpoints.map(({errors, ...endpoint}) => {
    if(errors && errors.errorSet && errors.errorSet.id) {
      endpointErrors[endpoint.name] = errors

      if(!errorSet) {
        errorSet = errorSets.find(({id}) => id === errors.errorSet.id)
      }
    }

    return endpoint
  })

  return {
    service: {
      ...service
    },
    endpointErrors,
    errorSet
  }
}

module.exports = extractErrorSet
