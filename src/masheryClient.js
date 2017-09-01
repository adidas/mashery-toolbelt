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

module.exports = {
  fetchAllServices,
  fetchService,
  fetchAllServiceEndpoints,
  updateServiceEndpoint,
  fetchAllServiceErrorSets,
  createErrorSet
};
