function mergeAPIs(sourceAPI, targetAPI) {
  const { endpoints: sourceEndpoints, ...sourceService } = sourceAPI;
  const { endpoints: targetEndpoints, ...targetService } = targetAPI;

  const service = mergeService(sourceService, targetService);
  const endpoints = mergeEndpoints(sourceEndpoints, targetEndpoints);

  return {
    service: {
      ...service,
      endpoints
    }
  };
}

// Remove irelevant properties
function cleanupEntity({ created, updated, ...data }) {
  return data;
}

function mergeService({id, ...sourceService}, {id, ...targetService}) {
  return Object.assign(cleanupEntity(targetService), cleanupEntity(sourceService));
}

function mergeEndpoints(sourceEndpoints, targetEndpoints) {
  const endpoints = []

  sourceEndpoints.forEach(sourceEndpoint => {
    let match

    // 1. Find by name
    const fullName = sourceEndpoint.name
    // const nameWithoutEnv = fullName.replace(/^[A-Z]{2,4}\s+/, '')

    match = targetEndpoints.find({name} => name === fullName /* || name.endsWith(nameWithoutEnv) */)

    if(match) {
      endpoints
    } else {
      
    }
  })
}

function mergeEndpoint(sourceEndpoint, targetEndpoint) {

}

module.exports = mergeAPIs;
