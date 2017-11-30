const { URL } = require('url');
const fetch = require('node-fetch');

require('dotenv').config();

const MASHERY_KEY = process.env.MASHERY_KEY;
const MASHERY_HOST = process.env.MASHERY_HOST;

// Common request headers
const RequestHeaders = new fetch.Headers({
  "Accept": "application/json",
  "Authorization": `Bearer ${MASHERY_KEY}`,
});

// Fetch HTTP Error Handler
function handleHTTPError(response) {
  if (!response.ok) {
    var message = `(${response.status}) ${response.statusText}\n\n`;
    const headers = response.headers['_headers'];

    for (var key in headers) {
      message += `${key}: ${headers[key]}\n`;
    }

    // response.text().then(data => console.log(data));

    throw Error(message);
  }
  return response;
}

// Retrieve JSON body
function retrieveJSONResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  throw new TypeError("Oops, we haven't got JSON!");
}

// Execute fetch request, handle HTTP errors and JSON body
function fetchMashery(request) {
  return fetch(request)
    .then(handleHTTPError)
    .then(retrieveJSONResponse);
}

//
// ---- Mashery API ----
//

// Fetch all Services
function fetchAllServices() {
  const url = new URL('/v3/rest/services', MASHERY_HOST);
  const request = new fetch.Request(url.toString(), {
    headers: RequestHeaders
  });

  return fetchMashery(request);
}

// Fetch one Service
function fetchService(serviceId) {
  const url = new URL(`/v3/rest/services/${serviceId}`, MASHERY_HOST);
  const request = new fetch.Request(url.toString(), {
    headers: RequestHeaders
  });

  return fetchMashery(request);
}

// Fetch All Error Sets for a Service
function fetchAllServiceErrorSets(serviceId) {
  const url = new URL(`/v3/rest/services/${serviceId}/errorSets`, MASHERY_HOST);
  const request = new fetch.Request(url.toString(), {
    headers: RequestHeaders
  });

  return fetchMashery(request);
}

// Create Error Set for a Service
function createErrorSet(serviceId, errorSet) {
  const url = new URL(`/v3/rest/services/${serviceId}/errorSets`, MASHERY_HOST);

  let headers = new fetch.Headers(RequestHeaders);
  headers.append('Content-Type', 'application/json');

  const request = new fetch.Request(url.toString(), {
    method: 'POST',
    headers: RequestHeaders,
    body: JSON.stringify(errorSet)
  });

  return fetchMashery(request);
}

// Fetch service endpoints
function fetchAllServiceEndpoints(serviceId) {
  const url = new URL(`/v3/rest/services/${serviceId}/endpoints`, MASHERY_HOST);
  const request = new fetch.Request(url.toString(), {
    headers: RequestHeaders
  });

  return fetchMashery(request);
}

// Update Endpoint 
function updateServiceEndpoint(serviceId, endpointId, endpointPayload) {
  const url = new URL(`/v3/rest/services/${serviceId}/endpoints/${endpointId}`, MASHERY_HOST);

  let headers = new fetch.Headers(RequestHeaders);
  headers.append('Content-Type', 'application/json');

  const request = new fetch.Request(url.toString(), {
    method: 'PUT',
    headers: RequestHeaders,
    body: JSON.stringify(endpointPayload)
  });

  return fetchMashery(request);
}

// Fetch single endpoints
function fetchEndpoint(serviceId,endpointId) {
  const url = new URL(`/v3/rest/services/${serviceId}/endpoints/${endpointId}?fields=id%2CallowMissingApiKey%2CapiKeyValueLocationKey%2CapiKeyValueLocations%2CapiMethodDetectionKey%2CapiMethodDetectionLocations%2Ccache%2CconnectionTimeoutForSystemDomainRequest%2CconnectionTimeoutForSystemDomainResponse%2CcookiesDuringHttpRedirectsEnabled%2Ccors%2Ccreated%2CcustomRequestAuthenticationAdapter%2CdropApiKeyFromIncomingCall%2CforceGzipOfBackendCall%2CgzipPassthroughSupportEnabled%2CheadersToExcludeFromIncomingCall%2ChighSecurity%2ChostPassthroughIncludedInBackendCallHeader%2CinboundSslRequired%2CjsonpCallbackParameter%2CjsonpCallbackParameterValue%2CscheduledMaintenanceEvent%2CforwardedHeaders%2CreturnedHeaders%2Cmethods%2Cname%2CnumberOfHttpRedirectsToFollow%2CoutboundRequestTargetPath%2CoutboundRequestTargetQueryParameters%2CoutboundTransportProtocol%2Cprocessor%2CpublicDomains%2CrequestAuthenticationType%2CrequestPathAlias%2CrequestProtocol%2CoauthGrantTypes%2CstringsToTrimFromApiKey%2CsupportedHttpMethods%2CsystemDomainAuthentication%2CsystemDomains%2CtrafficManagerDomain%2Cupdated%2CuseSystemDomainCredentials%2CsystemDomainCredentialKey%2CsystemDomainCredentialSecret&indent=0`, MASHERY_HOST);
  const request = new fetch.Request(url.toString(), {
    headers: RequestHeaders
  });
  return fetchMashery(request);
}


module.exports = {
  fetchAllServices,
  fetchService,
  fetchAllServiceEndpoints,
  updateServiceEndpoint,
  fetchAllServiceErrorSets,
  createErrorSet,
  fetchEndpoint
};
