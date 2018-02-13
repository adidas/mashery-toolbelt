function mergeApi(sourceAPI, targetAPI) {
  const {
    service: {
      endpoints: sourceEndpoints,
      organization: sourceOrganization,
      ...sourceService
    }
  } = sourceAPI;
  const {
    service: {
      endpoints: targetEndpoints,
      organization: targetOrganization,
      ...targetService
    }
  } = targetAPI;

  const service = mergeService(sourceService, targetService);
  const organization = mergeOrganization(sourceOrganization, targetOrganization);
  const endpoints = mergeEndpoints(sourceEndpoints, targetEndpoints);

  const api = {
    service: {
      ...service,
      organization,
      endpoints
    }
  };

  return api
}

// Remove irelevant properties
function cleanupEntity({ created, updated, ...data }) {
  return data;
}

function mergeService({ id, ...sourceService }, { ...targetService }) {
  return Object.assign(
    cleanupEntity(targetService),
    cleanupEntity(sourceService)
  );
}

function mergeOrganization(source, target) {
  if(!source) {
    return null
  }

  return Object.assign(source, target || {})
}

function mergeEndpoints(sourceEndpoints, targetEndpoints) {
  const endpoints = [];

  sourceEndpoints.forEach(sourceEndpoint => {
    const sourceId = sourceEndpoint.id;
    let match;

    // 1. Find by ID
    if (typeof sourceId === "string") {
      match = targetEndpoints.find(({ id }) => sourceId === id);
    }

    // 2. Find by name
    if (match === undefined) {
      const fullName = sourceEndpoint.name;
      // const nameWithoutEnv = fullName.replace(/^[A-Z]{2,4}\s+/, '')
      match = targetEndpoints.find(
        ({ name }) => fullName === name /* || name.endsWith(nameWithoutEnv) */
      );
    }

    // 3. Find by domains and paths
    // TODO

    if (match !== undefined) {
      if (!sourceId) {
        sourceEndpoint.id = match.id;
      } else if (!match.id) {
        match.id = sourceId;
      }

      endpoints.push(mergeEndpoint(sourceEndpoint, match));
    } else {
      // Creating new endpoint
      endpoints.push(cleanupEntity(sourceEndpoint));
    }
  });

  return endpoints;
}

function mergeEndpoint({id, ...sourceEndpoint}, targetEndpoint) {
  return Object.assign(
    cleanupEntity(targetEndpoint),
    cleanupEntity(sourceEndpoint)
  );
}

module.exports = mergeApi;
